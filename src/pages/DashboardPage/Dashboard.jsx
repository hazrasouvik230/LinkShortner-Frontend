// import React from "react";
// import styles from "./Dashboard.module.css";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Navbar from "../../components/Navbar/Navbar";
// import DashboardContainer from "./DashboardContainer";

// const Dashboard = ({ links, addNewLink, totalClicks, user }) => {
//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.leftContainer}>
//         <Sidebar />
//       </div>

//       <div className={styles.rightContainer}>
//         <Navbar userName={user?.name} addNewLink={addNewLink} />
//         <div className={styles.sidebar}>
//           <Sidebar />
//         </div>
//         <DashboardContainer links={links} totalClicks={totalClicks} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, {useState} from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardContainer from "./DashboardContainer";

const Dashboard = ({ links, addNewLink, totalClicks, user }) => {
  const [clickDevices, setClickDevices] = useState([
    { device: "Mobile", clicks: 134 },
    { device: "Desktop", clicks: 40 },
    { device: "Tablet", clicks: 3 },
  ]);

  const incrementDeviceClicks = (device) => {
    setClickDevices((prev) =>
      prev.map((d) =>
        d.device === device ? { ...d, clicks: d.clicks + 1 } : d
      )
    );
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>

      <div className={styles.rightContainer}>
        <Navbar userName={user?.name} addNewLink={addNewLink} />
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <DashboardContainer links={links} totalClicks={totalClicks} clickDevices={clickDevices} />
      </div>
    </div>
  );
};

export default Dashboard;