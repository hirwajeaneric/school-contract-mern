import React, { useEffect, useContext, createContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useState } from 'react';
// import { MessageContext } from '../../../App';

const MyContracts = ()=> {
  const [contracts, setContracts] = useState([])
  const [errors, setErrors] = useState("");
  // const [responsetext, setResponsetext] = useState("");
  
  // const { state } = useLocation();
  // setResponsetext(state.text);

  // console.log(state);
  useEffect(()=>{
    const regNo = localStorage.getItem("id");
    axios.get(`http://localhost:8080/api/contracts/findByRegNumber?regNumber=${regNo}`)
    .then((res) => {
      setContracts(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[]);

  return (
    <div className="contracts_container">
      <div className='titlebar'>
        <h1 className='titleText'>My Contracts</h1>
        <Link className='new_contract_link' to={'/new-contract'}>New</Link>
      </div>
      {/* Success message */}
      {/* {responsetext && 
        (<div className='success_message_box'>
          <p className='success_msg'>{responsetext}</p>
        </div>)
      } */}
      
      <div className='table-container'>
        <table>
          <thead>
            <tr>
                <th>Creation Date</th>
                <th>Due Amount</th>
                <th>Paid Amount</th>
                <th>Amount Per Installment</th>
                <th>Urubuto Pay Code</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contracts ? contracts.map(contract=>(
                <tr key={contract._id}>
                  <td>{contract.creationDate}</td>
                  <td>{contract.dueAmount}</td>
                  <td>{contract.paidAmount}</td>
                  <td>{contract.amountPerInstallment}</td>
                  <td>{contract.urubutoPayCode}</td>
                  <td>{contract.status}</td>
                  <td>
                    <Link to={`/contract/${contract._id}`} className="view-link">Details</Link>
                  </td>
                </tr>
              )): errors
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyContracts