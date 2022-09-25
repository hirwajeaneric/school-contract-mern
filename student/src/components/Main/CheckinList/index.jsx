import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CheckinList = () => {
  const [checkins, setCheckins] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    console.log(regNo);
    axios.get(`http://localhost:8080/api/checkin/findByRegNumber?regNumber=${regNo}`)
    .then((res) => {
      console.log(res.data);
      setCheckins(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="checkin_container">
      <div className='titlebar'>
        <h1 className='titleText'>My Installments</h1>
      </div>
      {/* <div className='success_message_box'>
        <p className='success_msg'>Successfully submitted a chekcin</p>
      </div> */}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Checkin No</th>
                <th>Due Date</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Urubuto Pay Code</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
              checkins ? checkins.map(checkin=>(
                <tr key={checkin._id}>
                  <td>{checkin.checkinNumber}</td>
                  <td>{checkin.dueDate}</td>
                  <td>{checkin.dueAmount}</td>
                  <td>{checkin.paidAmount}</td>
                  <td>{checkin.urubutoPayCode}</td>
                  <td>{checkin.status}</td>
                  <td>
                    <Link to={`/update-checkin/${checkin._id}`} className="view-link">View/Update</Link>
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