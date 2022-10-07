import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentContractTable from './StudentContractTable';
import './styles.css';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([])
  // const [errors, setErrors] = useState("");

  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    axios.get(`http://localhost:8080/api/contracts/findByRegNumber?regNumber=${regNo}`)
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
        <h1 className='titleText'>My Contracts</h1>
        <Link className='new_contract_link' to={'/new-contract'}>New</Link>
      </div>
      
      <div className='table-container'>
        <StudentContractTable contracts={contracts} />
      </div>
    </div>
  )
}

export default MyContracts