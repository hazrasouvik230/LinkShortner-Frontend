import React from 'react'
import styles from './AnalyticsContainer.module.css'

const AnalyticsContainer = ({ analytics }) => {
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
              <td>{entry.timestamp}</td>
              <td>{entry.originalLink}</td>
              <td>{entry.shortLink}</td>
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