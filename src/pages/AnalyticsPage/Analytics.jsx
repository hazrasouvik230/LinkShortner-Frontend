import React from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import AnalyticsContainer from "./AnalyticsContainer";

const Analytics = ({ links, addNewLink, user, analytics }) => {
  return (
    <div className={styles.analytics}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>

      <div className={styles.rightContainer}>
        <Navbar userName={user?.name} addNewLink={addNewLink} />
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <AnalyticsContainer links={links} analytics={analytics} />
      </div>
    </div>
  );
};

export default Analytics;