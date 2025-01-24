import React from 'react'
import styles from './Settings.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import SettingsContainer from './SettingsContainer'

const Settings = ({ links, addNewLink, user }) => {
  return (
    <div className={styles.settings}>
        <div className={styles.leftContainer}>
            <Sidebar />
        </div>

        <div className={styles.rightContainer}>
            <Navbar userName={user?.name} addNewLink={addNewLink} />
            <SettingsContainer links={links} user={user} />
        </div>
    </div>
  )
}

export default Settings