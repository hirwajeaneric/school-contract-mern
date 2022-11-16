import React, { useContext, useEffect } from 'react'
import './styles.css';
import axios from 'axios';
import { useState } from 'react';
import StudentContractTable from './StudentContractTable';
import { ServerResponseContext } from '../../../App';
import Success from '../Success/index';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([]);
  const serverResponse = useContext(ServerResponseContext);
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/list`)
      .then((res)=>{
        res.data.forEach(contract => {
        contract.id = contract._id;
        setContracts(res.data);
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
        <h1 className='titleText'>Contracts</h1>
      </div>
      <div className='response-message-space' style={{display: "flex", flexDirection:'row', alignItems:"center", justifyContent:'center', width: '100%'}}>
        {serverResponse.visible && <Success message={serverResponse.message} />}
      </div>
      <div className='table-container'>
        <StudentContractTable contracts={contracts} />
      </div>
    </div>
  )
}

export default MyContracts