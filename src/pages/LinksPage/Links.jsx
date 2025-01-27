import React from 'react';
import styles from './Links.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import LinksContainer from './LinksContainer';

const Links = ({ links, addNewLink, setLinks, user, addAnalyticsEntry }) => {
  return (
    <div className={styles.links}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>
      <div className={styles.rightContainer}>
        <Navbar userName={user?.name} addNewLink={addNewLink} />
        <div className={styles.sidebar}><Sidebar /></div>
        <LinksContainer links={links} setLinks={setLinks} addAnalyticsEntry={addAnalyticsEntry} />
      </div>
    </div>
  );
};

export default Links;