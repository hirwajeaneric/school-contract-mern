import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.css';

const ContractDetails = () => {

  const contractId = useParams();

  const [contract, setContract] = useState({})

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/findById?id=${contractId.id}`)
    .then((res) => {
      console.log(res.data);
      setContract(res.data)
    })
    .catch(error => {
      console.log(error);
    })
  },[]);


  return (
    <div className='contractdetails-container'>
      <h1>Contract Details</h1>
      <h3 className='contract-date'>Contract created on: &nbsp;&nbsp; 
        <span className='the-date'>{contract.creationDate}</span>
      </h3>
      <div className="contractdetails-space">
        <div className="detail-titles">
          <p>Due Amount</p>
          <p>Paid Amount</p>
          <p>Amount Per Installment</p>
          <p>Payment Code</p>
          <p>Email</p>
          <p>Sponsor Email</p>
          <p>Status</p>
          <p>Accountant comment</p>
        </div>
        <div className="detail-info">
          <p className="detail-values">{contract.dueAmount}</p>
          <p className="detail-values">{contract.paidAmount}</p>
          <p className="detail-values">{contract.amountPerInstallment}</p>
          <p className="detail-values">{contract.urubutoPayCode}</p>
          <p className="detail-values">{contract.email}</p>
          <p className="detail-values">{contract.sponsorEmail}</p>
          <p className="detail-values">{contract.status}</p>
          <p className="detail-values">{contract.comment}</p>
        </div>
      </div>
      <div className='button-group'>
        <Link className='details-back-btn' to={'/contracts'}>Back</Link>
      </div>
    </div>
  )
}

export default ContractDetails