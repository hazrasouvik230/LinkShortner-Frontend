import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-regular fa-envelope-open', path: '/dashboard' },
    { name: 'Links', icon: 'fa-solid fa-link', path: '/links' },
    { name: 'Analytics', icon: 'fa-solid fa-arrow-trend-up', path: '/analytics' },
    { name: 'Settings', icon: 'fa-solid fa-gear', path: '/settings' },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="./Logo.png" alt="Logo" />
      </div>

      <div className={styles.sideItemsContainer}>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`${styles.sideItem} ${location.pathname === item.path ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
          >
            <i className={item.icon}></i>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;