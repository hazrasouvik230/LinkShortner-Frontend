import React, { useState } from 'react';
import styles from './CreateModal.module.css'; // Include styles for the modal here

const CreateModal = ({ onClose, onCreate }) => {
  const [destinationUrl, setDestinationUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [linkExpiration, setLinkExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');

  const [errors, setErrors] = useState({ destinationUrl: '', remarks: '', expirationDate: '' });

  const validateForm = () => {
    const newErrors = {};

    // Validate Destination URL
    if (!destinationUrl) {
      newErrors.destinationUrl = 'Destination URL is required.';
    } else if (!/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[/#?]?.*$/.test(destinationUrl)) {
      newErrors.destinationUrl = 'Enter a valid URL (e.g., https://example.com).';
    }

    // Validate Remarks
    if (!remarks) {
      newErrors.remarks = 'Remarks are required.';
    }

    // Validate Expiration Date if Link Expiration is enabled
    if (linkExpiration && !expirationDate) {
      newErrors.expirationDate = 'Expiration date is required.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      const linkData = {
        destinationUrl,
        remarks,
        linkExpiration,
        expirationDate: linkExpiration ? expirationDate : null,
      };
      onCreate(linkData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>New Link</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Destination URL */}
          <div className={styles.destination}>
            <label>Destination URL <span className={styles.required}>*</span></label>
            <input
              type="url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://web.whatsapp.com/"
              required
            />
            {errors.destinationUrl && <p className={styles.error}>{errors.destinationUrl}</p>}
          </div>

          {/* Remarks */}
          <div className={styles.remarks}>
            <label>Remarks <span className={styles.required}>*</span></label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks"
            />
            {errors.remarks && <p className={styles.error}>{errors.remarks}</p>}
          </div>

          {/* Link Expiration */}
          <div className={styles.expire}>
            <p className={styles.linkExpiration}>Link Expiration</p>
            <div
              className={`${styles.toggleBtn} ${linkExpiration ? styles.active : ''}`}
              onClick={() => setLinkExpiration(!linkExpiration)}
            ></div>
          </div>

          {/* Expiration Date */}
          {linkExpiration && (
            <div className={styles.expDate}>
              <label>Expiration Date</label>
              <input
                type="datetime-local"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              {errors.expirationDate && <p className={styles.error}>{errors.expirationDate}</p>}
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          {/* Clear Button */}
          <button
            className={styles.clearButton}
            onClick={() => {
              setDestinationUrl('');
              setRemarks('');
              setLinkExpiration(false);
              setExpirationDate('');
              setErrors({}); // Clear errors
            }}
          >
            Clear
          </button>

          {/* Create Button */}
          <button
            className={styles.createButton}
            onClick={handleCreate}
          >
            Create new
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;