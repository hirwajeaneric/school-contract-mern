import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.css';

const ContractDetails = () => {

  const contractId = useParams();

  const [contract, setContract] = useState({});

  const [errors, setErrors] = useState("");

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
          <tr className='details-table-row'>
            <th className='details-table-header'>Due Amount</th>
            <td className='details-table-data'>
              <p className='table_values'>{contract.dueAmount}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Paid Amount</th>
            <td className='details-table-data'>
              <p className='table_values'>{contract.paidAmount}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Amount Per Installment</th>
            <td className='details-table-data'>
              <p className='table_values'>{contract.amountPerInstallment}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Urubuto Payment Code</th>
            <td className='details-table-data'>
              <p className='table_values'>{contract.urubutoPayCode}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Email</th>
            <td className='details-table-data'>
              <p className='table_values'>{contract.email}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Sponsor Email</th>
            <td className='details-table-data'>{contract.sponsorEmail}</td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Status</th>
            <td className='details-table-data'>{contract.status}</td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Accountant Comments</th>
            <td className='details-table-data'>{contract.comment}</td>
          </tr>
        </table>
      </div>
      <div className="button-group">
        <Link to={`/contracts`} className="back-link">Back</Link>
        <Link to={`/update-contract/${contractId.id}`} className="update-contract-link">Update</Link>
      </div>
    </div>
  )
}

export default ContractDetails