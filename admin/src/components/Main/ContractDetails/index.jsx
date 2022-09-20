import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles.css';

const ContractDetails = () => {

  const contractId = useParams();

  const [contract, setContract] = useState({})
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/findById?id=${contractId.id}`)
    .then((res) => {
      console.log(res.data);
      setContract(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);


  return (
    <div className='contractdetails-container'>
      <h2>Contract Details</h2>
      <h3 className='contract-date'>Contract created on: &nbsp;&nbsp; 
        <span className='the-date'>{contract.creationDate}</span>
      </h3>
      <div className="contractdetails-space">
        <table className='contractdetails-table'>
          <tr>
            <th>Due Amount</th>
            <td>{contract.dueAmount}</td>
          </tr>
          <tr>
            <th>Paid Amount</th>
            <td>{contract.paidAmount}</td>
          </tr>
          <tr>
            <th>Amount Per Installment</th>
            <td>{contract.amountPerInstallment}</td>
          </tr>
          <tr>
            <th>Urubuto Payment Code</th>
            <td>{contract.urubutoPayCode}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{contract.email}</td>
          </tr>
          <tr>
            <th>Sponsor Email</th>
            <td>{contract.sponsorEmail}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{contract.status}</td>
          </tr>
          <tr>
            <th>Accountant Comments</th>
            <td>{contract.comment}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default ContractDetails