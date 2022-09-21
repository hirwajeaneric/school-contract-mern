import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

function UpdateContract() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    urubutoPayCode:"",
    paidAmount: "",
    dueAmount:"",
    amountPerInstallment: "",
    email:"",
    sponsorEmail:"",    
    status: "",
    creationDate: "",
    comment: ""
  });

  const [error, setError] = useState("");
  
  const contractId = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contracts/findById?id=${contractId.id}`)
    .then((res) => {
      console.log(res.data);
      setFormData(res.data)
    })
    .catch(error => {
      setError(error)
    })
  },[]);

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
        if(contract)
          navigate(`/success`);
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
      <h1>Validate Contract</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <table>
          <tbody>
            <tr>
              <td><label>Due Amount</label></td>
              <td>{formData.dueAmount}</td>
            </tr>
            <tr>
              <td><label>Paid Amount</label></td>
              <td><td>{formData.paidAmount}</td></td>
            </tr>
            <tr>
              <td><label>Amount per installment</label></td>
              <td><td>{formData.amountPerInstallment}</td></td>
            </tr>
            <tr>
              <td><label>Urubuto Pay Code</label></td>
              <td><td>{formData.urubutoPayCode}</td></td>
            </tr>
            <tr>
              <td><label>Status</label></td>
              <td>
                <select 
                  className='status-select'
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} >
                  <option className='options'>Pending</option>
                  <option className='options'>Approved</option>
                  <option className='options'>Rejected</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Comment</label></td>
              <td>
                <textarea 
                  rows={4}
                  className='comment' 
                  name="comment" 
                  value={formData.comment} 
                  placeholder="Comment" 
                  onChange={handleChange}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-group">
          <button type='submit' className='submit-btn'>Submit</button>
          <Link to={`/contract/${contractId.id}`} className="back-link">Back</Link>
          <Link to={`/contracts`} className="cancel-link">cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateContract