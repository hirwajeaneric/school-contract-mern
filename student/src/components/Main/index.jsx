import React from 'react'
import SideNavBar from '../SideNavBar';
import TopBar from '../TopBar';
import styles from './styles.module.css';

const Main = () => {
    return (
        <div className={styles.main_container}>
            <TopBar />      
            <SideNavBar />
        </div>
    )
}

export default Main