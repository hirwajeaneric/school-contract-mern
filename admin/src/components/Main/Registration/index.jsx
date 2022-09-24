import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';

const Registration = ()=> {
  const [registration, setRegistration] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/registration/list`)
    .then((res) => {
      console.log(res.data);
      setRegistration(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Registration Info</h1>
      </div>
      <div className='table-container'>
        <table className='list-contract-table'>
          <thead>
            <tr>
                <th>Reg Number</th>
                <th>Name</th>
                <th>Due Amount</th>
                <th>Number of Courses</th>
            </tr>
          </thead>
          <tbody>
            {
              registration ? registration.map(aregistration=>(
                <tr key={aregistration._id}>
                  <td>{aregistration.regNumber}</td>
                  <td>{aregistration.name}</td>
                  <td>{aregistration.dueAmount}</td>
                  <td>{aregistration.numberOfCourses}</td>
                </tr>
              )): errors
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Registration