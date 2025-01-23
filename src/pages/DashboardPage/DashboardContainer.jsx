import React from 'react';
import styles from './DashboardContainer.module.css';

const DashboardContainer = ({ totalClicks }) => {
  // Sample data for date-wise clicks and click devices
  const dateWiseClicks = [
    { date: '21-01-25', clicks: 1234 }, // take it as 100%
    { date: '20-01-25', clicks: 1140 },
    { date: '19-01-25', clicks: 134 },
    { date: '18-01-25', clicks: 34 },
  ];

  const clickDevices = [
    { device: 'Mobile', clicks: 134 }, // take it as 100%
    { device: 'Desktop', clicks: 40 },
    { device: 'Tablet', clicks: 3 },
  ];

  const maxDateClicks = Math.max(...dateWiseClicks.map((data) => data.clicks));
  const maxDeviceClicks = Math.max(...clickDevices.map((data) => data.clicks));

  return (
    <div className={styles.dashboardContainer}>
      <h2>
        Total Clicks <span className={styles.totalClicks}>{totalClicks}</span>
      </h2>

      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <h3>Date-wise Clicks</h3>
          {dateWiseClicks.map((data, index) => (
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
          {clickDevices.map((data, index) => (
            <div key={index} className={styles.barContainer}>
              <span>{data.device}</span>
              <div
                className={styles.bar}
                style={{ width: `${(data.clicks / maxDeviceClicks) * 100}%` }}
              ></div>
              <span>{data.clicks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;