import React from "react";
import axios from "axios";
import styles from "./DeleteLinkModal.module.css";
import { baseUrl } from "../../Urls";

const DeleteLinkModal = ({ onClose, linkId, setLinks }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/api/links/${linkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update links state after deletion
      setLinks((prevLinks) =>
        prevLinks.filter(
          (link) => link._id.$oid !== linkId && link._id !== linkId
        )
      );

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Are you sure you want to delete this link?</h2>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.btnSecondary}>
            NO
          </button>
          <button onClick={handleDelete} className={styles.btnPrimary}>
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLinkModal;