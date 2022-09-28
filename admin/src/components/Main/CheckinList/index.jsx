import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CheckinList = () => {
  const [checkins, setCheckins] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/list`)
    .then((res) => {
      console.log(res.data);
      setCheckins(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Installments</h1>
      </div>
      <div className='table-container'>
        <table className='list-contract-table'>
          <thead>
            <tr>
                <th>RegNumber</th>
                <th>Checkin No</th>
                <th>Urubuto Pay Code</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Submit Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              checkins ? checkins.map(checkin=>(
                <tr key={checkin._id}>
                  <td>{checkin.regNumber}</td>
                  <td>{checkin.checkinNumber}</td>
                  <td>{checkin.urubutoPayCode}</td>
                  <td>{checkin.dueAmount}</td>
                  <td>{checkin.paidAmount}</td>
                  <td>{checkin.submitDate}</td>
                  <td>{checkin.status}</td>
                  <td>
                    <Link to={`/checkin/${checkin._id}`} className="view-link">Details</Link>
                    <Link to={`/update-checkin/${checkin._id}`} className="update-link">Update</Link>
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

export default CheckinList