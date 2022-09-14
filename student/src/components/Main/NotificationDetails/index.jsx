import React from 'react';
import './styles.css';

const NotificationDetails = () => {
  return (
    <div className='notification_container'>
      <div className='ntitlebar'>
        <h1 className='ntitleText'>Your Notifications</h1>
      </div>
      <div className='the-message'>
        <h2 className='date-of-the-message'>March 23, 2022</h2>
      </div>
    </div>
  )
}

export default NotificationDetails