import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.css';

const CheckinDetails = () => {

  const checkinId = useParams();

  const [checkin, setCheckin] = useState({});

  const [errors, setErrors] = useState("");

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/findById?id=${checkinId.id}`)
    .then((res) => {
      console.log(res.data);
      setCheckin(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);


  return (
    <div className='contractdetails-container'>
      <h2>Installment Details</h2>
      <h3 className='contract-date'>
        Installment for:
        &nbsp;&nbsp; 
        <span className='the-date'>{checkin.regNumber}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        created on: 
        &nbsp;&nbsp; 
        <span className='the-date'>{checkin.dueDate}</span>
      </h3>
      <div className="contractdetails-space">
        <table className='contractdetails-table'>
          <tr className='details-table-row'>
            <th className='details-table-header'>Contract Id</th>
            <td className='details-table-data'>
              <p className='table_values'>{checkin.contractId}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Due Amount</th>
            <td className='details-table-data'>
              <p className='table_values'>{checkin.dueAmount}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Paid Amount</th>
            <td className='details-table-data'>
              <p className='table_values'>{checkin.paidAmount}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Urubuto Payment Code</th>
            <td className='details-table-data'>
              <p className='table_values'>{checkin.urubutoPayCode}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Submit Date</th>
            <td className='details-table-data'>
              <p className='table_values'>{checkin.submitDate}</p>
            </td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Status</th>
            <td className='details-table-data'>{checkin.status}</td>
          </tr>
          <tr className='details-table-row'>
            <th className='details-table-header'>Accountant Comments</th>
            <td className='details-table-data'>{checkin.comment}</td>
          </tr>
        </table>
      </div>
      <div className="button-group">
        <Link to={`/checkins`} className="back-link">Back</Link>
        <Link to={`/update-checkin/${checkinId.id}`} className="update-contract-link">Update</Link>
      </div>
    </div>
  )
}

export default CheckinDetails