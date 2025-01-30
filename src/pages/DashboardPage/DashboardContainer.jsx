import React from "react";
import styles from "./DashboardContainer.module.css";

const DashboardContainer = ({ totalClicks, links, analytics }) => {
  // Function to format date to 'dd-mm-yy'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
  };

  // Aggregate clicks by date
  const dateWiseClicks = links.reduce((acc, link) => {
    const formattedDate = formatDate(link.date);
    acc[formattedDate] = (acc[formattedDate] || 0) + link.clicks;
    return acc;
  }, {});

  const dateWiseClicksArray = Object.keys(dateWiseClicks).map((date) => ({
    date,
    clicks: dateWiseClicks[date],
  }));

  // Dynamically count clicks per device from analytics
  const deviceClicks = analytics.reduce(
    (acc, data) => {
      const device = (data.userDevice || "Unknown").toLowerCase(); // Normalize to lowercase
      if (["android", "windows", "ios"].includes(device)) {
        acc[device] = (acc[device] || 0) + 1;
      }
      return acc;
    },
    { android: 0, windows: 0, ios: 0 }
  ); // Ensure default values

  // Convert the object into an array
  const clickDevices = [
    { device: "Android", clicks: deviceClicks.android },
    { device: "Windows", clicks: deviceClicks.windows },
    { device: "iOS", clicks: deviceClicks.ios },
  ];

  const maxDateClicks = Math.max(
    ...dateWiseClicksArray.map((data) => data.clicks),
    1
  );
  const maxDeviceClicks = Math.max(
    ...clickDevices.map((data) => data.clicks),
    1
  );

  return (
    <div className={styles.dashboardContainer}>
      <h2>
        Total Clicks <span className={styles.totalClicks}>{totalClicks}</span>
      </h2>

      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <h3>Date-wise Clicks</h3>
          {dateWiseClicksArray.map((data, index) => (
            <div key={index} className={styles.barContainer}>
              <span>{data.date}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barLength}
                  style={{ width: `${(data.clicks / maxDateClicks) * 100}%` }}
                ></div>
              </div>
              <span>{data.clicks}</span>
            </div>
          ))}
        </div>

        <div className={styles.chart}>
          <h3>Click Devices</h3>
          {clickDevices.map((data, index) => (
            <div key={index} className={styles.barContainer}>
              <span>{data.device}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barLength}
                  style={{ width: `${(data.clicks / maxDeviceClicks) * 100}%` }}
                ></div>
              </div>
              <span>{data.clicks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
