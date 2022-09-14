import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const MyContracts = ()=> {
  const [errors, setErrors] = useState("");
  const [yourContracts, setYourContracts] = useState([]);

  useEffect(()=>{
    const URL ="http://localhost:8080/api/contracts/searchByRegistrationNumber/";
    const yourRegNumber = localStorage.getItem('id');
  
    axios.get(URL+""+yourRegNumber)
    .then(response=>{
      const contractData = response.data;
      setYourContracts({...yourContracts, contractData});
    })
    .catch(error => {setErrors(...errors, error)})
    console.log(yourContracts);
  },[yourContracts, errors])

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>My Contracts</h1>
        <Link className='new_contract_link' to={'/new-contract'}>New</Link>
      </div>
      {/* <div className='success_message_box'>
        <p className='success_msg'>Error Message Here</p>
      </div> */}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Creation Date</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Amount Per Installment</th>
                <th>Urubuto Pay Code</th>
                <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* { yourContracts.map(contract =>{
              return (
                <ul key={contract.id}>
                  <li>{contract.creationDate}</li>
                  <li>{contract.dueAmount}</li>
                  <li>{contract.paidAmount}</li>
                  <li>{contract.amountPerInstallment}</li>
                  <li>{contract.urubutoPayCode}</li>
                  <li>{contract.status}</li>    
                </ul>
              )
            })} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyContracts