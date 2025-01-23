import React from 'react'
import styles from './AnalyticsContainer.module.css'

const data = [
  {
    id: '1',
    timestamp: 'Jan 14, 2025 16:30',
    originalLink: 'https://www.travelwiththejoneses.com',
    shortLink: 'https://cuvette.io/Bn41aCOlnxj',
    ipAddress: '192.158.1.38',
    userDevice: 'Android',
  },
  {
    id: '2',
    timestamp: 'Jan 14, 2025 6:30',
    originalLink: 'https://www.travelwiththejoneses.com',
    shortLink: 'https://cuvette.io/Bn41aCOlnxj',
    ipAddress: '192.158.1.38',
    userDevice: 'Chrome',
  },
  {
    id: '3',
    timestamp: 'Jan 14, 2025 8:30',
    originalLink: 'https://www.travelwiththejoneses.com',
    shortLink: 'https://cuvette.io/Bn41aCOlnxj',
    ipAddress: '192.158.1.38',
    userDevice: 'iOS',
  },
];

const AnalyticsContainer = () => {
  return (
    <div className={styles.analyticsContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>ip address</th>
            <th>User Device</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.originalLink}</td>
              <td>{item.shortLink}</td>
              <td>{item.ipAddress}</td>
              <td>{item.userDevice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AnalyticsContainer