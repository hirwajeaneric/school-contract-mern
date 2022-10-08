import React, { useEffect } from 'react'
import './styles.css';
import axios from 'axios';
import { useState } from 'react';
import RegistrationTable from './RegistrationTable';

const Registration = ()=> {
  const [registration, setRegistration] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/registration/list`)
    .then((res) => {
      res.data.forEach(registration => {
        registration.id = registration._id;
        setRegistration(res.data)
      });
    })
    .catch(error => {
      console.log(error);
    });
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Registration Info</h1>
      </div>
      <div className='table-container'>
        <RegistrationTable registration={registration} />    
      </div>
    </div>
  )
}

export default Registration