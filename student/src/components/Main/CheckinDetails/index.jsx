import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './styles.css';

const CheckinDetails = () => {  

  const[checkinData, setCheckinData] = useState({
    regNumber: "",
    contractId: "",
    checkinNumber: "",
    urubutoPayCode:"",
    dueAmount:"",
    paidAmount: "",
    dueDate: "",
    submitDate: "",
    status: "",
    comment: ""
  });

  const [errors, setErrors] = useState("");

  const checkinId = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/findById?id=${checkinId.id}`)
    .then((res) => {
      console.log(res.data);
      setCheckinData(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[checkinId.id]);

  return (
    <div className='form-container'>
      <h1>Installment Details</h1>
      <table className='details-contract-form-table'>
        <tbody>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Chechin Number</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.checkinNumber}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Due Date</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.dueDate}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Due Amount</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.dueAmount}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Submit Date</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.submitDate}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Paid Amount</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.paidAmount}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Urubuto Pay Code</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.urubutoPayCode}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Status</label>
            </td>
            <td>
              <p className="update-values">{checkinData.status}</p>
            </td>
          </tr>
          <tr className='update-table-row'>
            <td className='update-table-td'>
              <label>Accountant comment</label>
            </td>
            <td className='update-table-td'>
              <p className="update-values">{checkinData.comment}</p>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className='button-group'>
        <Link className='details-back-btn' to={'/checkins'}>Back</Link>
        <Link className='next-to-update-btn' to={`/update-checkin/${checkinId.id}`}>Next/Update</Link>
      </div>
    </div>
  )
}

export default CheckinDetails