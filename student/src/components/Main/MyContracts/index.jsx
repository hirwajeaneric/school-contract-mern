import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentContractTable from './StudentContractTable';
import './styles.css';
import { ServerResponseContext } from '../../../App';
import Success from '../Success';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([]);
  const serverResponse = useContext(ServerResponseContext);
  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    axios.get(`http://localhost:8080/api/contracts/findByRegNumber?regNumber=${regNo}`)
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
        <h1 className='titleText'>My Contracts</h1>
        <Link className='new_contract_link' to={'/new-contract'}>New</Link>
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