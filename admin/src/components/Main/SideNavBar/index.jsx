import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const SideNavBar = () => {
  return (
    <div className={styles.navigation_container}>
        <div className="navigation_links">
          <Link to='/' className={styles.link}>Dashboard Home</Link>
          <Link to='contracts' className={styles.link}>Contracts</Link>
          <Link to='checkins' className={styles.link}>Installments</Link>
          <Link to='registration' className={styles.link}>Registration</Link>
          <Link to='users' className={styles.link}>Users</Link>
        </div>
    </div>
  )
}

export default SideNavBar