import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const SideNavBar = () => {
  return (
    <div className={styles.navigation_container}>
        <div className="navigation_links">
           <Link to='contracts' className={styles.link}>My Contracts</Link>
           <Link to='new-contract' className={styles.link}>New Contract</Link>
           <Link to='checkins' className={styles.link}>Installments</Link>
           <Link to='notifications' className={styles.link}>Notifications</Link>
        </div>
    </div>
  )
}

export default SideNavBar