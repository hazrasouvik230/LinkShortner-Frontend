import React, { useState, useEffect } from "react";
import styles from "./EditLinkModal.module.css";

const EditLinkModal = ({ onClose, onCreate, linkData }) => {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [linkExpiration, setLinkExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");

  const [errors, setErrors] = useState({});

  // Populate fields with linkData when modal opens
  useEffect(() => {
    console.log("Received linkData from edit link:", linkData);
    if (linkData) {
      setDestinationUrl(linkData.originalLink || "");
      setRemarks(linkData.remarks || "");
      setLinkExpiration(!!linkData.expirationDate); // True if expiration date exists
      setExpirationDate(linkData.expirationDate || "");
    }
  }, [linkData]);

  const validateForm = () => {
    const newErrors = {};

    if (!destinationUrl) {
      newErrors.destinationUrl = "Destination URL is required.";
    } else if (
      !/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[/#?]?.*$/.test(destinationUrl)
    ) {
      newErrors.destinationUrl =
        "Enter a valid URL (e.g., https://example.com).";
    }

    if (!remarks) {
      newErrors.remarks = "Remarks are required.";
    }

    if (linkExpiration && !expirationDate) {
      newErrors.expirationDate = "Expiration date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      const updatedLinkData = {
        _id: linkData?._id || null,
        destinationUrl,
        remarks,
        linkExpiration,
        expirationDate: linkExpiration ? expirationDate : null,
      };

      onCreate(updatedLinkData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Edit Link</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.destination}>
            <label>
              Destination URL <span className={styles.required}>*</span>
            </label>
            <input
              type="url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://web.whatsapp.com/"
              required
            />
            {errors.destinationUrl && (
              <p className={styles.error}>{errors.destinationUrl}</p>
            )}
          </div>

          <div className={styles.remarks}>
            <label>
              Remarks <span className={styles.required}>*</span>
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks"
            />
            {errors.remarks && <p className={styles.error}>{errors.remarks}</p>}
          </div>

          <div className={styles.expire}>
            <p className={styles.linkExpiration}>Link Expiration</p>
            <div
              className={`${styles.toggleBtn} ${
                linkExpiration ? styles.active : ""
              }`}
              onClick={() => setLinkExpiration(!linkExpiration)}
            ></div>
          </div>

          {linkExpiration && (
            <div className={styles.expDate}>
              <label>Expiration Date</label>
              <input
                type="datetime-local"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              {errors.expirationDate && (
                <p className={styles.error}>{errors.expirationDate}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.clearButton}
            onClick={() => {
              setDestinationUrl("");
              setRemarks("");
              setLinkExpiration(false);
              setExpirationDate("");
              setErrors({});
            }}
          >
            Clear
          </button>
          <button className={styles.createButton} onClick={handleCreate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLinkModal;