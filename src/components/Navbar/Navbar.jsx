import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import CreateModal from "../CreateModal/CreateModal";

const Navbar = ({ userName = "User", addNewLink }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState({ text: "", emoji: "" });
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const now = new Date();
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);

    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting({ text: "Good morning", emoji: "☀️" });
    } else if (hour >= 12 && hour < 17) {
      setGreeting({ text: "Good afternoon", emoji: "🌤️" });
    } else if (hour >= 17 && hour < 21) {
      setGreeting({ text: "Good evening", emoji: "🌅" });
    } else {
      setGreeting({ text: "Good night", emoji: "🌙" });
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <div>
        <div className={styles.greeting}>
          <span role="img" aria-label="emoji">{greeting.emoji}</span> {greeting.text}, {userName}
        </div>
        <div className={styles.date}>{currentDate}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.createButton} onClick={toggleModal}>
          <span>+</span> Create new
        </button>
        <div className={styles.searchContainer}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search by remarks" className={styles.searchInput} />
        </div>
        <div className={styles.profile} onClick={handleVisible}>
          <span className={styles.profileInitials}>{userName.slice(0, 2).toUpperCase()}</span>
        </div>
      </div>
      {visible && <div className={styles.logout}>Logout</div>}
      {showModal && (
        <CreateModal
          onClose={toggleModal}
          onCreate={(linkData) => {
            addNewLink(linkData);
            toggleModal();
          }}
        />
      )}
    </div>
  );
};

export default Navbar;