import React from 'react'
import styles from './Settings.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import SettingsContainer from './SettingsContainer'

const Settings = ({ links, addNewLink }) => {
  return (
    <div className={styles.settings}>
        <div className={styles.leftContainer}>
            <Sidebar />
        </div>

        <div className={styles.rightContainer}>
            <Navbar addNewLink={addNewLink} />
            <SettingsContainer links={links} />
        </div>
    </div>
  )
}

export default Settings