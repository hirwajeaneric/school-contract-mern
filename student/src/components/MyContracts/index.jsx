import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const MyContracts = ()=> {
  return (
    <div className={styles.contracts_container}>
      <div className={styles.titleBar}>
        <h1 className={styles.titleText}>My Contracts</h1>
        <Link to='/new-contract' className={styles.new_contract_link}>New</Link>
      </div>
      <div className={styles.listofcontracts}>
        <div className={styles.acontract}>
          Hello world
        </div>
      </div>
      </div>
  )
}

export default MyContracts