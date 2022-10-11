import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Success from '../Success/index';
import { ServerResponseContext } from '../../../App';
import StudentCheckinTable from './StudentCheckinTable';
import './styles.css';

const CheckinList = () => {
  const [checkins, setCheckins] = useState([])
  const serverResponse = useContext(ServerResponseContext);
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

  if(serverResponse.visible) {
    setTimeout(() => {
      serverResponse.visible = false;
    }, 5000);
  }

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>Installments</h1>
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