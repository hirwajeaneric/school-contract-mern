import React, { useEffect } from 'react'
import './styles.css';
import axios from 'axios';
import { useState } from 'react';
import StudentContractTable from './StudentContractTable';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/list`)
      .then((res)=>{
        res.data.forEach(contract => {
        contract.id = contract._id;
        setContracts(res.data);
      });
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Contracts</h1>
      </div>
      
      <div className='table-container'>
        <StudentContractTable contracts={contracts} />
        </div>
    </div>
  )
}

export default MyContracts