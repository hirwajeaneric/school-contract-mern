import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Notifications = () => {
  return (
    <div className='notification_container'>
      <div className='titlebar'>
        <h1 className='titleText'>Your Notifications</h1>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Time</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Info</td>
              <td>Lorem ipsum dolor sit amen. Hello world is the message every programmer starts with.</td>
              <td>September 2, 2022</td>
              <td><Link className='read-more' to={'/notification-details'}>Read More</Link></td>    
            </tr>
            <tr>
              <td>Info</td>
              <td>Lorem ipsum dolor sit amen. Hello world is the message every programmer starts with.</td>
              <td>September 2, 2022</td>
              <td><Link className='read-more' to={'/notification-details'}>Read More</Link></td>    
            </tr>
            <tr>
              <td>Info</td>
              <td>Lorem ipsum dolor sit amen. Hello world is the message every programmer starts with.</td>
              <td>September 2, 2022</td>
              <td><Link className='read-more' to={'/notification-details'}>Read More</Link></td>    
            </tr>
            <tr>
              <td>Info</td>
              <td>Lorem ipsum dolor sit amen. Hello world is the message every programmer starts with.</td>
              <td>September 2, 2022</td>
              <td><Link className='read-more' to={'/notification-details'}>Read More</Link></td>    
            </tr>
                        <tr>
              <td>Info</td>
              <td>Lorem ipsum dolor sit amen. Hello world is the message every programmer starts with.</td>
              <td>September 2, 2022</td>
              <td><Link className='read-more' to={'/notification-details'}>Read More</Link></td>    
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notifications