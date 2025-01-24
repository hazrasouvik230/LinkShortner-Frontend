// import React from 'react';
// import styles from './LinksContainer.module.css';

// const LinksContainer = ({ links, setLinks, addAnalyticsEntry }) => {
//   const incrementClickCount = (id, originalLink, shortLink) => {
//     const updatedLinks = links.map((link) =>
//       link.id === id ? { ...link, clicks: link.clicks + 1 } : link
//     );
//     setLinks(updatedLinks);

//     // Add new analytics entry
//     const newEntry = {
//       id,
//       timestamp: new Date().toLocaleString(),
//       originalLink,
//       shortLink,
//       ipAddress: "192.158.1.38", // Mocked data; replace with real data if available
//       userDevice: "Unknown", // Replace with real device info if available
//     };
//     addAnalyticsEntry(newEntry);
//   };

//   return (
//     <div className={styles.linksContainer}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Original Link</th>
//             <th>Short Link</th>
//             <th>Remarks</th>
//             <th>Clicks</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {links.map((link) => (
//             <tr key={link.id}>
//               <td>{link.date}</td>
//               <td>
//                 <a href={link.originalLink} target="_blank" rel="noopener noreferrer">
//                   {link.originalLink}
//                 </a>
//               </td>
//               <td>
//                 <a
//                   href={link.shortLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={() =>
//                     incrementClickCount(link.id, link.originalLink, link.shortLink)
//                   }
//                 >
//                   {link.shortLink}
//                 </a>
//               </td>
//               <td>{link.remarks}</td>
//               <td>{link.clicks}</td>
//               <td className={link.status === "Active" ? styles.active : styles.inactive}>
//                 {link.status}
//               </td>
//               <td>
//                 <button onClick={() => handleEdit(link.id)} className={styles.editButton}>
//                   ✏️
//                 </button>
//                 <button onClick={() => handleDelete(link.id)} className={styles.deleteButton}>
//                   🗑️
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LinksContainer;

import React, { useEffect } from 'react';
import styles from './LinksContainer.module.css';

const LinksContainer = ({ links, setLinks, addAnalyticsEntry }) => {
  // Function to increment click count
  const incrementClickCount = (id, originalLink, shortLink) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    );
    setLinks(updatedLinks);

    const newEntry = {
      id,
      timestamp: new Date().toLocaleString(),
      originalLink,
      shortLink,
      ipAddress: '192.158.1.38', // Mocked data
      userDevice: 'Unknown', // Replace with actual device info if available
    };
    addAnalyticsEntry(newEntry);
  };

  // Function to handle expiration
  const checkExpiration = () => {
    const currentTime = new Date();
    const updatedLinks = links.map((link) => {
      if (link.expirationDate && new Date(link.expirationDate) <= currentTime) {
        return { ...link, status: 'Inactive' };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  // Use setInterval to check for expired links periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkExpiration();
    }, 60000); // Check every 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [links]);

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
              <td>{new Date(link.date).toLocaleDateString()}</td>
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
                  onClick={() =>
                    link.status === 'Active' &&
                    incrementClickCount(link.id, link.originalLink, link.shortLink)
                  }
                >
                  {link.shortLink} <i class="fa-regular fa-copy"></i>
                </a>
              </td>
              <td>{link.remarks}</td>
              <td>{link.clicks}</td>
              <td className={link.status === 'Active' ? styles.active : styles.inactive}>
                {link.status}
              </td>
              <td>
                <button onClick={() => handleEdit(link.id)} className={styles.editButton}>
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => handleDelete(link.id)} className={styles.deleteButton}>
                  <i class="fa-solid fa-trash-can"></i>
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