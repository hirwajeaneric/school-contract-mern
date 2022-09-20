import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CheckinList = () => {
  return (
    <div className="checkin_container">
      <div className='titlebar'>
        <h1 className='titleText'>Checkins</h1>
      </div>
      {/* <div className='success_message_box'>
        <p className='success_msg'>Successfully submitted a chekcin</p>
      </div> */}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Contract Date</th>
                <th>Checkin number</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Urubuto Pay Code</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>September 2, 2022</td>
              <td>1</td>
              <td>40000</td>
              <td>40000</td>
              <td>safadfsdf</td>
              <td>Pending</td>
              <td><Link to={'/update-checkin'}>Update/View</Link></td>    
            </tr>
            <tr>
              <td>September 2, 2022</td>
              <td>1</td>
              <td>40000</td>
              <td>40000</td>
              <td>safadfsdf</td>
              <td>Pending</td>
              <td><Link to={'/update-checkin'}>Update/View</Link></td>
            </tr>
            <tr>
              <td>September 2, 2022</td>
              <td>1</td>
              <td>40000</td>
              <td>40000</td>
              <td>safadfsdf</td>
              <td>Pending</td>
              <td><Link to={'/update-checkin'}>Update/View</Link></td>    
            </tr>
            <tr>
              <td>September 2, 2022</td>
              <td>1</td>
              <td>40000</td>
              <td>40000</td>
              <td>safadfsdf</td>
              <td>Pending</td>
              <td><Link to={'/update-checkin'}>Update/View</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheckinList