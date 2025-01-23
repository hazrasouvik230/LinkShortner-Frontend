import React from 'react';
import styles from './LinksContainer.module.css';

const LinksContainer = ({ links, setLinks }) => {
  const incrementClickCount = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    );
    setLinks(updatedLinks);
  };

  const handleEdit = (id) => {
    alert(`Edit link with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setLinks(links.filter((link) => link.id !== id));
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
              <td>{link.date}</td>
              <td>
                <a href={link.originalLink} target="_blank" rel="noopener noreferrer">
                  {link.originalLink}
                </a>
              </td>
              <td>
                <a href={link.shortLink} target="_blank" rel="noopener noreferrer" onClick={() => incrementClickCount(link.id)}>
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
                <button onClick={() => handleDelete(link.id)} className={styles.deleteButton}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksContainer;