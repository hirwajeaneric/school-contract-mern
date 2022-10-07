import React, { useEffect} from 'react'
import { Outlet, useParams } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopBar from './TopBar';
import './styles.css';
import axios from 'axios';

const Main = () => {
  useEffect(()=>{;
    const yourRegNumber = localStorage.getItem('id');
    axios.get(`http://localhost:8080/api/registration/searchByRegistrationNumber?regNumber=${yourRegNumber}`)
    .then((res)=>{
      localStorage.setItem('dueAmount',res.data.dueAmount);
      localStorage.setItem('numberOfCourses',res.data.numberOfCourses);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  const param = useParams();
  console.log(param);

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