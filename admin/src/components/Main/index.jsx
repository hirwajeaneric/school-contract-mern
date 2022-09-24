import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
// import NotificationBar from './NotificationBar';
import SideNavBar from './SideNavBar';
import TopBar from './TopBar';
import './styles.css';
import axios from 'axios';

const Main = () => {
  return (
    <div className='grid-container'>
      <div id='item1'>
        <TopBar/>
      </div>
      <div id='item2'>
        <SideNavBar />
      </div>
      <div id='item3'>
        <Outlet />
      </div>
      <div id='item4'>
        {/* <NotificationBar /> */}
      </div>
      <div id='item5'></div>
    </div>
  )
}

export default Main