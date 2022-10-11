import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ServerResponseContext } from '../../../App';
import Success from '../Success';
import StudentCheckinTable from './StudentCheckinTable';
import './styles.css';

const CheckinList = () => {

  const serverResponse = useContext(ServerResponseContext);

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

  console.log(serverResponse);

  if(serverResponse.visible) {
    setTimeout(() => {
      serverResponse.visible = false;
    }, 5000);
  }
  
  return (
    <div className="checkin_container">
      <div className='titlebar'>
        <h1 className='titleText'>My Installments</h1>
      </div>
      <div className='response-message-space' style={{display: "flex", flexDirection:'row', alignItems:"center", justifyContent:'center', width: '100%'}}>
        {serverResponse.visible && <Success message={serverResponse.message} />}
      </div>
      <div className='table-container'>
        <StudentCheckinTable checkins={checkins} />
      </div>
    </div>
  )
}

export default CheckinList