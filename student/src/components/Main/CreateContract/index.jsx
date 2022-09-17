import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function CreateContract() {

  const navigate = useNavigate();

  const [due, setDue] = useState(0);
  const [reg, setReg] = useState('');
  const [names, setNames] = useState('');

  const [formData, setFormData] = useState({
    regNumber: "",
    name:"",
    urubutoPayCode:"",
    dueAmount: 0.0,
    paidAmount: 0.0,
    amountPerInstallment: 0.0,
    email:"",
    sponsorEmail:"",    
    status: "Pending",
    creationDate: "",
    comment: ""
  });

  useEffect(()=>{
    const amountToBePaid = localStorage.getItem("dueAmount");
    const studentRegistrationNumber = localStorage.getItem('id');
    const yourName = localStorage.getItem('name');
    
    setDue(amountToBePaid);
    setReg(studentRegistrationNumber);
    setNames(yourName);

    setFormData({ 
      ...formData, 
      dueAmount: due
    });
  }, [due])

  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input })=>{
    setFormData({...formData, [input.name]: input.value});
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:8080/api/contracts/new";
        const { data: res } = await axios.post(url, formData);
        const contract = res;
        console.log(contract);
        navigate(`/success/id=${contract._id}`);
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

  return (
    <div className='form-container'>
      <h1>Create a contract</h1>
      <form className='create-form' onSubmit={handleSubmit}>
      <div className='input-container'>
          <label>Name</label>
          <input 
            type={"text"} 
            name="name" 
            value={formData.name} 
            placeholder="Your Name" 
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label>RegNumber</label>
          <input 
            type={"text"} 
            name="regNumber" 
            value={formData.regNumber} 
            placeholder="Registration Number" 
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label>Due Amount</label>
          <input 
            type={"text"} 
            name="dueAmount" 
            value={formData.dueAmount} 
            placeholder="Amount Due" 
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label>Paid Amount</label>
          <input 
          type={"text"} 
          name="paidAmount" 
          value={formData.paidAmount} 
          placeholder="Amount Paid" 
          onChange={handleChange}
        />
        </div>
        <div className='input-container'>
          <label>Urubuto Pay Code</label>
          <input type={"text"} 
          name="urubutoPayCode" 
          value={formData.urubutoPayCode} 
          placeholder="Urubuto Payment Code" 
          onChange={handleChange}
        />
        </div>
        <div className='input-container'>
          <label>Your Email</label>
          <input 
          type={"text"} 
          name="email" 
          value={formData.email} 
          placeholder="Email Address" 
          onChange={handleChange}
        />
        </div>
        <div className='input-container'>
          <label>Sponsor's Email</label>
          <input 
          type={"text"} 
          name="sponsorEmail" 
          value={formData.sponsorEmail} 
          placeholder="Sponsor's Email Address" 
          onChange={handleChange}
        />
        </div>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <div className='buttons'>
          <button type='submit' className='summary-btn'>Submit</button>
          <Link className='cancel-btn' to={'/contracts'}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateContract