import React from 'react';
import styles from './Links.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import LinksContainer from './LinksContainer';

const Links = ({ links, addNewLink, setLinks }) => {
  return (
    <div className={styles.links}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>
      <div className={styles.rightContainer}>
        <Navbar addNewLink={addNewLink} />
        <LinksContainer links={links} setLinks={setLinks} />
      </div>
    </div>
  );
};

export default Links;