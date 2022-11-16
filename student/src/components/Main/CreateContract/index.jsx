import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ServerResponseContextSetter } from '../../../App';
import './styles.css';

function CreateContract() {
  const serverResponseSetter = useContext(ServerResponseContextSetter);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  
  useEffect(()=>{
    const presetData = {
      regNumber: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      dueAmount: localStorage.getItem("dueAmount")
    }

    const contractData = {
      urubutoPayCode:"",
      paidAmount: 0.0,
      amountPerInstallment: 0.0,
      email:"",
      sponsorEmail:"",    
      status: "Pending",
      creationDate: "",
      comment: ""
    }

    var combinedFormData = Object.assign(contractData, presetData);

    setFormData(combinedFormData);
  }, [])

  const handleChange = ({currentTarget: input })=>{
    setFormData({...formData, [input.name]: input.value});
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.paidAmount === 0 || formData.paidAmount === ""){
      setError("Paid amount is required!");
      return;
    } else if(formData.urubutoPayCode===""){
      setError("The code of your payment is required!");
      return;
    } else if(formData.urubutoPayCode.length!==12){
      setError("Invalid payment code!");
      return;
    } else if(formData.email==="" || formData.email.length < 5) {
      setError("Your email address is required!");
      return;
    } else if(formData.sponsorEmail==="" || formData.sponsorEmail.length < 5) {
      setError("Email of your sponsor is required!");
      return;
    } else {
      try {
        const url = "http://localhost:8080/api/contracts/new";
        const { data: res } = await axios.post(url, formData);
        const contract = res;
        if(contract){
          serverResponseSetter({message:'Contract Submitted!!', visible: true});
          navigate(`/contracts`);
        }
      } catch (error) {
          if(
              error.response &&
              error.response.status >= 400 && 
              error.response.status <= 500
          ){
              setError(error.response.data.message);
          }
      }
    }
}

  return (
    <div className='form-container'>
      <h1>Create a contract</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <table>
        <tbody>
          <tr>
            <td>
              <label>Due Amount</label>
            </td>
            <td>
              <input 
                type={"text"} 
                name="dueAmount" 
                value={formData.dueAmount} 
                placeholder="Amount Due" 
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Paid Amount</label>
            </td>
            <td>
              <input 
                type={"text"} 
                name="paidAmount" 
                value={formData.paidAmount} 
                placeholder="Amount Paid" 
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Urubuto Pay Code</label>
            </td>
            <td>
              <input type={"text"} 
                name="urubutoPayCode" 
                value={formData.urubutoPayCode} 
                placeholder="Urubuto Payment Code" 
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Your Email</label>
            </td>
            <td>
              <input 
                type={"text"} 
                name="email" 
                value={formData.email} 
                placeholder="Email Address" 
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Sponsor's Email</label>
            </td>
            <td>
              <input 
                type={"text"} 
                name="sponsorEmail" 
                value={formData.sponsorEmail} 
                placeholder="Sponsor's Email Address" 
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type='submit' className='submit-btn'>Submit</button>
            </td>
            <td className='cancel-btn-container'>
              <Link className='cancel-btn' to={'/contracts'}>Cancel</Link>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default CreateContract