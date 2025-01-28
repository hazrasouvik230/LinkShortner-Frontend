// import React, { useState } from "react";
// import styles from "./LinksContainer.module.css";
// import DeleteLinkModal from "../../components/DeleteLinkModal/DeleteLinkModal";
// import EditLinkModal from "../../components/EditLinkModal/EditLinkModal";
// import Copy from "../../components/Copy/Copy";
// import { AnimatePresence } from "framer-motion";
// import { baseUrl } from "../../Urls";

// const LinksContainer = ({ links, setLinks, addAnalyticsEntry }) => {
//   const incrementClickCount = async (id) => {
//     const linkId = id.$oid || id;
//     console.log("Click logged for Link ID:", linkId);

//     if (!linkId) {
//       console.error("Error: Link ID is undefined");
//       return;
//     }

//     try {
//       const response = await fetch(`${baseUrl}/api/links/click/${linkId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to log click");
//       }

//       const result = await response.json();

//       // Log device details in the console
//     console.log(
//       `Click logged for Link ID: ${linkId} from Device: ${result.userDevice}`
//     );

//       // Update the links state with the new click count
//       setLinks((prevLinks) =>
//         prevLinks.map((link) =>
//           link._id === linkId ? { ...link, clicks: result.clicks } : link
//         )
//       );

//       // Add analytics entry to state
//       const analyticsEntry = {
//         timestamp: result.timestamp,
//         originalLink: result.originalLink,
//         shortLink: result.shortLink,
//         ipAddress: result.ipAddress,
//         userDevice: result.userDevice,
//       };
//       addAnalyticsEntry(analyticsEntry);

//       console.log("Click logged successfully:", result);
//     } catch (error) {
//       console.error("Error logging click:", error);
//     }
//   };

//   const [isCopy, setIsCopy] = useState(false);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedLink, setSelectedLink] = useState(null);

//   const handleEdit = (id) => {
//     const link = links.find((link) => (link._id.$oid || link._id) === id);
//     console.log(`Editing link:`, link);
//     setSelectedLink(link);
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = (updatedLink) => {
//     // Update the links state with the edited link details
//     setLinks((prevLinks) =>
//       prevLinks.map((link) =>
//         (link._id.$oid || link._id) ===
//         (updatedLink._id.$oid || updatedLink._id)
//           ? { ...link, ...updatedLink }
//           : link
//       )
//     );

//     // Optionally, make an API call to save the changes to the backend
//     fetch(`${baseUrl}/api/links/${updatedLink._id.$oid || updatedLink._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedLink),
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to update the link");
//         return response.json();
//       })
//       .then((result) => {
//         console.log("Link updated successfully:", result);
//       })
//       .catch((error) => {
//         console.error("Error updating link:", error);
//       });

//     // Close the modal after updating
//     setIsEditModalOpen(false);
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedLinkId, setSelectedLinkId] = useState(null);

//   const openDeleteModal = (id) => {
//     const linkId = id.$oid || id;
//     console.log(`Deleting link with ID: ${linkId}`);
//     setSelectedLinkId(linkId);
//     setIsModalOpen(true);
//   };

//   const handleShortLinkClick = (id, shortLink) => {
//     console.log(`Short link clicked: ${shortLink}, ID: ${id}`);
//     incrementClickCount(id);
//   };

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     const formattedDate = date.toLocaleDateString(undefined, options);
//     const formattedTime = date.toLocaleTimeString(undefined, {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return `${formattedDate} ${formattedTime}`;
//   };

//   return (
//     <div className={styles.linksContainer}>
//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Original Link</th>
//               <th>Short Link</th>
//               <th>Remarks</th>
//               <th>Clicks</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {links.map((link) => (
//               <tr key={link.id}>
//                 <td>{formatDateTime(link.date)}</td>
//                 <td>
//                   <a
//                     href={link.originalLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {link.originalLink.length > 15
//                       ? `${link.originalLink.substring(0, 15)}...`
//                       : link.originalLink}
//                   </a>
//                 </td>
//                 <td>
//                   <a
//                     href={link.shortLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       incrementClickCount(link._id.$oid || link._id).then(
//                         () => {
//                           navigator.clipboard
//                             .writeText(link.originalLink)
//                             .then(() => {
//                               console.log(
//                                 "Link is copied: ",
//                                 link.originalLink
//                               );
//                               setIsCopy(true);
//                               setTimeout(() => setIsCopy(false), 5000);
//                             });
//                         }
//                       );
//                     }}
//                   >
//                     {`${baseUrl}/${link.shortLink}`}{" "}
//                     <i
//                       class="fa-regular fa-copy"
//                       style={{ marginLeft: "0.5rem" }}
//                     ></i>
//                   </a>
//                 </td>
//                 <td>{link.remarks}</td>
//                 <td>{link.clicks}</td>
//                 <td
//                   className={
//                     link.status === "Active" ? styles.active : styles.inactive
//                   }
//                 >
//                   {link.status}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleEdit(link._id.$oid || link._id)}
//                     className={styles.editButton}
//                   >
//                     <i class="fa-solid fa-pen"></i>
//                   </button>
//                   <button
//                     onClick={() => openDeleteModal(link._id.$oid || link._id)}
//                     className={styles.deleteButton}
//                   >
//                     <i class="fa-solid fa-trash-can"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <AnimatePresence>{isCopy && <Copy />}</AnimatePresence>

//       {isEditModalOpen && (
//         <EditLinkModal
//           onClose={() => setIsEditModalOpen(false)}
//           onCreate={handleEditSubmit}
//           linkData={selectedLink}
//         />
//       )}

//       {isModalOpen && (
//         <DeleteLinkModal
//           onClose={() => setIsModalOpen(false)}
//           linkId={selectedLinkId}
//           setLinks={setLinks}
//         />
//       )}
//     </div>
//   );
// };

// export default LinksContainer;












import React, { useState } from "react";
import styles from "./LinksContainer.module.css";
import DeleteLinkModal from "../../components/DeleteLinkModal/DeleteLinkModal";
import EditLinkModal from "../../components/EditLinkModal/EditLinkModal";
import Copy from "../../components/Copy/Copy";
import { AnimatePresence } from "framer-motion";
import { baseUrl } from "../../Urls";

const LinksContainer = ({ links, setLinks, addAnalyticsEntry }) => {
  const incrementClickCount = async (id) => {
    const linkId = id.$oid || id;
    console.log("Click logged for Link ID:", linkId);

    if (!linkId) {
      console.error("Error: Link ID is undefined");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/links/click/${linkId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to log click");
      }

      const result = await response.json();

      // Log device details in the console
    console.log(
      `Click logged for Link ID: ${linkId} from Device: ${result.userDevice}`
    );

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
      addAnalyticsEntry(analyticsEntry);

      // Increment clickDevices count
    const deviceType = result.userDevice || "Unknown"; // Handle cases where userDevice might be undefined
    const updatedClickDevices = [...clickDevices];
    const deviceIndex = updatedClickDevices.findIndex(
      (device) => device.device === deviceType
    );

    if (deviceIndex !== -1) {
      updatedClickDevices[deviceIndex].clicks += 1;
    } else {
      updatedClickDevices.push({ device: deviceType, clicks: 1 });
    }

    setClickDevices(updatedClickDevices);

      console.log("Click logged successfully:", result);
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  const [isCopy, setIsCopy] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleEdit = (id) => {
    const link = links.find((link) => (link._id.$oid || link._id) === id);
    console.log(`Editing link:`, link);
    setSelectedLink(link);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedLink) => {
    // Update the links state with the edited link details
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        (link._id.$oid || link._id) ===
        (updatedLink._id.$oid || updatedLink._id)
          ? { ...link, ...updatedLink }
          : link
      )
    );

    // Optionally, make an API call to save the changes to the backend
    fetch(`${baseUrl}/api/links/${updatedLink._id.$oid || updatedLink._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLink),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update the link");
        return response.json();
      })
      .then((result) => {
        console.log("Link updated successfully:", result);
      })
      .catch((error) => {
        console.error("Error updating link:", error);
      });

    // Close the modal after updating
    setIsEditModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const openDeleteModal = (id) => {
    const linkId = id.$oid || id;
    console.log(`Deleting link with ID: ${linkId}`);
    setSelectedLinkId(linkId);
    setIsModalOpen(true);
  };

  const handleShortLinkClick = (id, shortLink) => {
    console.log(`Short link clicked: ${shortLink}, ID: ${id}`);
    incrementClickCount(id);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className={styles.linksContainer}>
      <div className={styles.tableWrapper}>
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
                  <a
                    href={link.originalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.originalLink.length > 15
                      ? `${link.originalLink.substring(0, 15)}...`
                      : link.originalLink}
                  </a>
                </td>
                <td>
                  <a
                    href={link.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      incrementClickCount(link._id.$oid || link._id).then(
                        () => {
                          navigator.clipboard
                            .writeText(link.originalLink)
                            .then(() => {
                              console.log(
                                "Link is copied: ",
                                link.originalLink
                              );
                              setIsCopy(true);
                              setTimeout(() => setIsCopy(false), 5000);
                            });
                        }
                      );
                    }}
                  >
                    {`${baseUrl}/${link.shortLink}`}{" "}
                    <i
                      class="fa-regular fa-copy"
                      style={{ marginLeft: "0.5rem" }}
                    ></i>
                  </a>
                </td>
                <td>{link.remarks}</td>
                <td>{link.clicks}</td>
                <td
                  className={
                    link.status === "Active" ? styles.active : styles.inactive
                  }
                >
                  {link.status}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(link._id.$oid || link._id)}
                    className={styles.editButton}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => openDeleteModal(link._id.$oid || link._id)}
                    className={styles.deleteButton}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>{isCopy && <Copy />}</AnimatePresence>

      {isEditModalOpen && (
        <EditLinkModal
          onClose={() => setIsEditModalOpen(false)}
          onCreate={handleEditSubmit}
          linkData={selectedLink}
        />
      )}

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