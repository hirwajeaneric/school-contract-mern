import React from 'react'
import MyContracts from '../MyContracts';
import SideNavBar from '../SideNavBar';
import TopBar from '../TopBar';
import styles from './styles.module.css';

const Main = () => {
    return (
        <div className={styles.main_container}>
            <TopBar />    
            <MyContracts />  
            <SideNavBar />
        </div>
    )
}

export default Main