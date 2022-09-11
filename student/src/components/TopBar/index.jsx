import React from 'react';
import styles from './styles.module.css';
import auca_icon from '../../Assets/Img/iconLogo.png';

const TopBar = () => {
    
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.left_side}>
                <div className={styles.logo}>
                    <img src={auca_icon} alt='' className={styles.image}/>
                </div>
                <h1 className={styles.systemName}>AUCA Contract</h1>
            </div>
            <div className={styles.right_side}>
                <p className={styles.userName}>{name}&nbsp;&nbsp;&nbsp;-</p>
                <p className={styles.registrationNumber}>{id}</p>
                <button className={styles.logout_btn} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default TopBar