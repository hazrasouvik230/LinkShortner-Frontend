import React, {useState} from 'react';
import styles from './LinksContainer.module.css';
import DeleteLinkModal from '../../components/DeleteLinkModal/DeleteLinkModal'

const LinksContainer = ({ links, setLinks, addAnalyticsEntry }) => {
  const incrementClickCount = async (id) => {
    const linkId = id.$oid || id; // Extract the actual ID
    console.log("Click logged for Link ID:", linkId); // Debugging
  
    if (!linkId) {
      console.error("Error: Link ID is undefined");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/links/click/${linkId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Failed to log click");
      }
  
      const result = await response.json();
  
      // Update the links state with the new click count
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link._id === linkId ? { ...link, clicks: result.clicks } : link
        )
      );
  
      // Add analytics entry to state
      const analyticsEntry = {
        timestamp: result.timestamp,
        originalLink: result.originalLink,
        shortLink: result.shortLink,
        ipAddress: result.ipAddress,
        userDevice: result.userDevice,
      };
      addAnalyticsEntry(analyticsEntry); // Update analytics state
  
      console.log("Click logged successfully:", result);
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };
  
  const handleEdit = (id) => {
    alert(`Edit link with ID: ${id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedLinkId, setSelectedLinkId] = useState(null);

  const openDeleteModal = (id) => {
    const linkId = id.$oid || id; // Adjust for nested ID structure
    console.log(`Deleting link with ID: ${linkId}`);
    setSelectedLinkId(linkId); // Set the selected link ID
    setIsModalOpen(true);
  };

  const handleShortLinkClick = (id, shortLink) => {
    console.log(`Short link clicked: ${shortLink}, ID: ${id}`);
    incrementClickCount(id);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options); // e.g., Jan 14, 2025
    const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }); // e.g., 16:30
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className={styles.linksContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>{formatDateTime(link.date)}</td>
              <td>
                <a href={link.originalLink} target="_blank" rel="noopener noreferrer">
                  {link.originalLink}
                </a>
              </td>
              <td>
                <a
                  href={link.shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => incrementClickCount(link._id.$oid || link._id)}
                >
                  {link.shortLink}
                </a>
              </td>
              <td>{link.remarks}</td>
              <td>{link.clicks}</td>
              <td className={link.status === 'Active' ? styles.active : styles.inactive}>
                {link.status}
              </td>
              <td>
                <button onClick={() => handleEdit(link.id)} className={styles.editButton}>
                  ✏️
                </button>
                <button onClick={() => openDeleteModal(link._id.$oid || link._id)} className={styles.deleteButton}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DeleteLinkModal
          onClose={() => setIsModalOpen(false)}
          linkId={selectedLinkId}
          setLinks={setLinks}
        />
      )}
    </div>
  );
};

export default LinksContainer;