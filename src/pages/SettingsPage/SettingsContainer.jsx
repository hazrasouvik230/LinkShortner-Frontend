import React, { useEffect, useState } from "react";
import styles from "./SettingsContainer.module.css";

const SettingsContainer = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    // Populate form data when the user prop is received
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.ph || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Changes saved successfully");
        const updatedUser = await response.json();
        console.log("Updated User:", updatedUser);
      } else {
        alert("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch("http://localhost:5000/api/user/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          alert("Account deleted successfully");
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          alert("Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting the account");
      }
    }
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

export default SettingsContainer;
