import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardContainer from "./DashboardContainer";

const Dashboard = ({
  links,
  addNewLink,
  totalClicks,
  user,
  setUser,
  setLinks,
  setAnalytics,
  analytics
}) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>

      <div className={styles.rightContainer}>
        <Navbar
          userName={user?.name}
          addNewLink={addNewLink}
          setUser={setUser}
          setLinks={setLinks}
          setAnalytics={setAnalytics}
        />
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <DashboardContainer links={links} totalClicks={totalClicks} analytics={analytics} />
      </div>
    </div>
  );
};

export default Dashboard;