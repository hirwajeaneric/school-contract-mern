import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const SideNavBar = () => {
  return (
    <div className='navigation_container'>
        <div className="navigation_NavLinks">
          <NavLink to='/' className="NavLink">Dashboard Home</NavLink>
          <NavLink to='contracts' className="NavLink">Contracts</NavLink>
          <NavLink to='checkins' className="NavLink">Installments</NavLink>
          <NavLink to='registration' className="NavLink">Registration</NavLink>
          <NavLink to='settings' className="NavLink">Settings</NavLink>
        </div>
    </div>
  )
}

export default SideNavBar