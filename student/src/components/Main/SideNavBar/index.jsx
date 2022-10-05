import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SideNavBar = () => {
  // const params = new URLSearchParams(window.location.pathname);
  // console.log(params.values);
  return (
    <div className="navigation_container">
        <div className="navigation_links">
          <Link to='/' className="link">Home</Link>
          <Link to='contracts' className="link">My Contracts</Link>
          <Link to='new-contract' className="link">New Contract</Link>
          <Link to='checkins' className="link">Installments</Link>
          {/* <Link to='notifications' className="link">Notifications</Link> */}
        </div>
    </div>
  )
}

export default SideNavBar