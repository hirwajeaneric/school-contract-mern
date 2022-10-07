import React from 'react'
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopBar from './TopBar';
import './styles.css';

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
    </div>
  )
}

export default Main