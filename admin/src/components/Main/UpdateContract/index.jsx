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
  },[contractId.id]);

  const handleChange = ({currentTarget: input })=>{
    setFormData({...formData, [input.name]: input.value});
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.status === "Pending"){
      setError("Status must be updated!");
      return;
    } else {
      try {
        const url = `http://localhost:8080/api/contracts/update?id=${contractId.id}`;
        const { data: res } = await axios.put(url, formData);
        const contract = res;
        if(contract)
          navigate(`/contracts`);
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
        <table className='update-contract-form-table'>
          <tbody>
            <tr className='update-table-row'>
              <td><label>Due Amount</label></td>
              <td><p className="update-values">{formData.dueAmount}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Paid Amount</label></td>
              <td><p className="update-values">{formData.paidAmount}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Amount per installment</label></td>
              <td><p className="update-values">{formData.amountPerInstallment}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Urubuto Pay Code</label></td>
              <td><p className="update-values">{formData.urubutoPayCode}</p></td>
            </tr>
            <tr className='update-table-row'>
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
            <tr className='update-table-row'>
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
        <div className="update-button-group">
          <button type='submit' className='update-submit-btn'>Submit</button>
          <Link to={`/contract/${contractId.id}`} className="update-back-link">Back</Link>
          <Link to={`/contracts`} className="update-cancel-link">cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateContract