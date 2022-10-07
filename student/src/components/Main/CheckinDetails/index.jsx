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
      setCheckinData(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[checkinId.id]);

  return (
    <div className='form-container'>
      <h1>Installment Details</h1>
      <div className="checkin_details_container">
        <div className="detail-titles">
          <p>Chechin Number</p>
          <p>Due Date</p>
          <p>Due Amount</p>
          <p>Submit Date</p>
          <p>Paid Amount</p>
          <p>Urubuto Pay Code</p>
          <p>Status</p>
          <p>Accountant comment</p>
        </div>
        <div className="detail-info">
          <p className="detail-values">{checkinData.checkinNumber}</p>
          <p className="detail-values">{checkinData.dueDate}</p>
          <p className="detail-values">{checkinData.dueAmount}</p>
          <p className="detail-values">{checkinData.submitDate}</p>
          <p className="detail-values">{checkinData.paidAmount}</p>
          <p className="detail-values">{checkinData.urubutoPayCode}</p>
          <p className="detail-values">{checkinData.status}</p>
          <p className="detail-values">{checkinData.comment}</p>
        </div>
      </div>
      <div className='button-group'>
        <Link className='details-back-btn' to={'/checkins'}>Back</Link>
        <Link className='next-to-update-btn' to={`/update-checkin/${checkinId.id}`}>Next/Update</Link>
      </div>
    </div>
  )
}

export default CheckinDetails