import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
// import NotificationBar from './NotificationBar';
import SideNavBar from './SideNavBar';
import TopBar from './TopBar';
import './styles.css';
import axios from 'axios';

const Main = () => {

  const [errors, setErrors] = useState("")

  useEffect(()=>{;
    const yourRegNumber = localStorage.getItem('username');
    axios.get(`http://localhost:8080/api/registration/searchByRegistrationNumber?regNumber=${yourRegNumber}`)
    .then((res)=>{
      localStorage.setItem('dueAmount',res.data.dueAmount);
      localStorage.setItem('numberOfCourses',res.data.numberOfCourses);
    })
    .catch(error => {
      setErrors(error)
    })
  },[])

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