import React, { useState, useEffect } from "react";
import styles from "./DashboardContainer.module.css";

const DashboardContainer = ({ totalClicks, links, analytics }) => {
  const [clickDevices, setClickDevices] = useState({});

  useEffect(() => {
    // Aggregate clicks by device dynamically
    const deviceCounts = analytics.reduce((acc, entry) => {
      acc[entry.userDevice] = (acc[entry.userDevice] || 0) + 1;
      return acc;
    }, {});

    setClickDevices(deviceCounts);
  }, [analytics]);

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
    if (acc[formattedDate]) {
      acc[formattedDate] += link.clicks;
    } else {
      acc[formattedDate] = link.clicks;
    }
    return acc;
  }, {});

  // Convert the aggregated data into an array for display
  const dateWiseClicksArray = Object.keys(dateWiseClicks).map((date) => ({
    date,
    clicks: dateWiseClicks[date],
  }));

  const maxDateClicks = Math.max(
    ...dateWiseClicksArray.map((data) => data.clicks)
  );
  
  const maxClicks = Math.max(...Object.values(clickDevices), 1); // Avoid division by zero

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
              <div
                className={styles.bar}
                style={{ width: `${(data.clicks / maxDateClicks) * 100}%` }}
              ></div>
              <span>{data.clicks}</span>
            </div>
          ))}
        </div>

        <div className={styles.chart}>
          <h3>Click Devices</h3>
          {Object.entries(clickDevices).map(([device, count], index) => (
            <div key={index} className={styles.barContainer}>
              <span>{device}</span>
              <div
                className={styles.bar}
                style={{ width: `${(count / maxClicks) * 100}%` }}
              ></div>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;