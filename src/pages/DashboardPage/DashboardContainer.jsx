import React from "react";
import styles from "./DashboardContainer.module.css";

const DashboardContainer = ({ totalClicks, links }) => {
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

  // Sample data for click devices (You may need to replace it with actual data)
  // const clickDevices = [
  //   { device: "Mobile", clicks: 134 },
  //   { device: "Desktop", clicks: 40 },
  //   { device: "Tablet", clicks: 3 },
  // ];
  const [clickDevices, setClickDevices] = useState([
    { device: "Mobile", clicks: 0 },
    { device: "Desktop", clicks: 0 },
    { device: "Tablet", clicks: 0 },
  ]);

  const maxDateClicks = Math.max(
    ...dateWiseClicksArray.map((data) => data.clicks)
  );
  const maxDeviceClicks = Math.max(...clickDevices.map((data) => data.clicks));

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