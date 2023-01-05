import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const SideNavBar = () => {
  return (
    <div className="navigation_container">
        <div className="navigation_links">
          <NavLink to='/' className="link">Home</NavLink>
          <NavLink to='contracts' className="link">My Contracts</NavLink>
          <NavLink to='new-contract' className="link">New Contract</NavLink>
          <NavLink to='checkins' className="link">Installments</NavLink>
        </div>
    </div>
  )
}

export default SideNavBar