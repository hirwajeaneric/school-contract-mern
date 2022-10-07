import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import { useState } from 'react';
import StudentContractTable from './StudentContractTable';
import axios from 'axios';

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

      {/* <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Creation Date</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Amount Per Installment</th>
                <th>Urubuto Pay Code</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contracts ? contracts.map(contract=>(
                <tr key={contract._id}>
                  <td>{contract.creationDate}</td>
                  <td>{contract.dueAmount}</td>
                  <td>{contract.paidAmount}</td>
                  <td>{contract.amountPerInstallment}</td>
                  <td>{contract.urubutoPayCode}</td>
                  <td>{contract.status}</td>
                  <td>
                    <Link to={`/contract/${contract._id}`} className="view-link">Details</Link>
                  </td>
                </tr>
              )): errors
            }
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

export default MyContracts