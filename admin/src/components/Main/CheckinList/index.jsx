import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentCheckinTable from './StudentCheckinTable';
import './styles.css';

const CheckinList = () => {
  const [checkins, setCheckins] = useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/list`)
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
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Installments</h1>
      </div>
      <div className='table-container'>
      <div className='table-container'>
        <StudentCheckinTable checkins={checkins} />
      </div>
      </div>
    </div>
  )
}

export default CheckinList