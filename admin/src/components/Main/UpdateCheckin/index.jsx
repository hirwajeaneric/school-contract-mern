import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';

const UpdateCheckin = () => {
  return (
    <div className='form-container'>
      <h1>Update checkin</h1>
      <form className='create-form'>
        <div className='input-container'>
          <label>Contract Date</label>
          <input type='text' className='form-input' name='dueAmount'/>
        </div>
        <div className='input-container'>
          <label>Checkin number</label>
          <input type='text' className='form-input' name='paidAmount'/>
        </div>
        <div className='input-container'>
          <label>Due Amount</label>
          <input type='text' className='form-input' name='urubutoPayCode'/>
        </div>
        <div className='input-container'>
          <label>Paid Amount</label>
          <input type='text' className='form-input' name='email'/>
        </div>
        <div className='input-container'>
          <label>Urubuto Pay Code</label>
          <input type='text' className='form-input' name='sponsorEmail'/>
        </div>
        {/* <div className='error-message-box'>
          <p className='error_msg'>Error Message Here</p>
        </div> */}
        <div className='buttons'>
          <Link className='summary-btn' to={'/checkins'}>Submit</Link>
          <Link className='cancel-btn' to={'/checkins'}>Back</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateCheckin