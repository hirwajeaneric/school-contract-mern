import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NotificationBar = () => {
  return (
    <React.Fragment>
      <div className="upper-par">
        <div className='title-area'>
          <h3>Notifications</h3>
        </div>
        <div className='notification-space'>
          <div className='a-notification'>
            <p className='notification-message'>Riminder: Hello World, lorem ipsum</p>
            <p className="time">12 March 2022</p>
          </div>
          <div className='a-notification'>
            <p className='notification-message'>Riminder: Hello World, lorem ipsum</p>
            <p className="time">12 March 2022</p>
          </div>
          <div className='a-notification'>
            <p className='notification-message'>Riminder: Hello World, lorem ipsum</p>
            <p className="time">12 March 2022</p>
          </div>
          <div className='a-notification'>
            <p className='notification-message'>Riminder: Hello World, lorem ipsum</p>
            <p className="time">12 March 2022</p>
          </div>
          <div className='a-notification'>
            <p className='notification-message'>Riminder: Hello World, lorem ipsum</p>
            <p className="time">12 March 2022</p>
          </div>
        </div>
      </div>
      <div className="more-space">
        <Link className='more-link' to={'/notifications'}>More</Link>
      </div>
    </React.Fragment>
  )
}

export default NotificationBar