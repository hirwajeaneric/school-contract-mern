import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/list`)
    .then((res) => {
      setContracts(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Student Contracts</h1>
      </div>
      <div className='table-container'>
        <table className='list-contract-table'>
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
                    <Link to={`/update-contract/${contract._id}`} className="update-link">Update</Link>
                  </td>
                </tr>
              )): errors
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyContracts