import React from "react";
import styles from "./DeleteAccountModal.module.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Urls";

const DeleteAccountModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/user/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        alert("Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Are you sure you want to delete the account?</h2>
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

export default DeleteAccountModal;