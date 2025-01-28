import React from "react";
import styles from "./AnalyticsContainer.module.css";
import { baseUrl } from "../../Urls";

const AnalyticsContainer = ({ analytics }) => {
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className={styles.analyticsContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>IP Address</th>
            <th>User Device</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((entry, index) => (
            <tr key={index}>
              <td>{formatDateTime(entry.timestamp)}</td>
              <td>{entry.originalLink}</td>
              <td>{baseUrl}/{entry.shortLink}</td>
              <td>{entry.ipAddress}</td>
              <td>{entry.userDevice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsContainer;