import React from 'react'
import styles from './styles.module.css';

const Main = () => {
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Auca Contract</h1>
                <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    )
}

export default Main