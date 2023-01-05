import React, { useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopBar from './TopBar';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const Main = () => {
  const [setup, setSetup] = useState({});
  // const [registration, setRegistration] = useState({});

  // Fetch contract setup
  useEffect(()=> {
    axios.get('http://localhost:8080/api/contractSetup/list')
    .then(response => {
      setSetup(response.data[0]);
      localStorage.setItem('rate',response.data[0].acceptedAmount);
      localStorage.setItem('semester',response.data[0].semester);
      localStorage.setItem('academicYear',response.data[0].academicYear);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  // Fetch registration information
  useEffect(()=> {
    axios.get(`http://localhost:8080/api/registration/findByIdSemAcYear?regNumber=${localStorage.getItem('id')}&semester=${localStorage.getItem('semester')}&academicYear=${localStorage.getItem('academicYear')}`)
    .then(response=>{
      localStorage.setItem('dueAmount',response.data.dueAmount);
      localStorage.setItem('numberOfCourses',response.data.numberOfCourses);
    })
    .catch(error=>{
      console.log(error);
    })
  },[setup.semester, setup.academicYear]);

  return (
    <div className='grid-container'>
      <div id='item1'>
        <TopBar/>
      </div>
      <div id='item2'>
        <SideNavBar />
      </div>
      <div id='item3'>
        <Outlet className="outlet-space" />
      </div>
    </div>
  )
}

export default Main