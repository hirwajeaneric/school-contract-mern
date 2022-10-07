import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentCheckinTable from './StudentCheckinTable';
import './styles.css';

const CheckinList = () => {
  const [checkins, setCheckins] = useState([])

  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    axios.get(`http://localhost:8080/api/checkin/findByRegNumber?regNumber=${regNo}`)
    .then((res) => {
      res.data.forEach(checkin => {
      checkin.id = checkin._id;
      setCheckins(res.data);
      });
    })
    .catch(error => {
      console.log(error);
    })
  },[]);
  
  return (
    <div className="checkin_container">
      <div className='titlebar'>
        <h1 className='titleText'>My Installments</h1>
      </div>
      <div className='table-container'>
        <StudentCheckinTable checkins={checkins} />
      </div>
    </div>
  )
}

export default CheckinList