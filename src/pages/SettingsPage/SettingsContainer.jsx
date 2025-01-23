import React, { useState } from "react";
import styles from "./SettingsContainer.module.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "Rahul Singh",
    email: "rahulsingh@gmail.com",
    mobile: "1234567890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Changes Saved");
    console.log("Saved Data:", formData);
  };

  const handleDelete = () => {
    alert("Account Deleted");
    // Add delete logic here
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.inputSections}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={handleSave}>
        Save Changes
      </button>

      <button onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
};

export default ProfileForm;
