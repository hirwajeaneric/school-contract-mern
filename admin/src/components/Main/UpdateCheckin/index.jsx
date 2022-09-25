import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const UpdateCheckin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    regNumber: "",
    contractId: "",
    checkinNumber: "",
    urubutoPayCode:"",
    dueAmount:"",
    paidAmount: "",
    dueDate: "",
    submitDate: "",
    status: "",
    comment: ""
  });

  const [error, setError] = useState("");
  
  const checkinId = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/findById?id=${checkinId.id}`)
    .then((res) => {
      console.log(res.data);
      setFormData(res.data)
    })
    .catch(error => {
      setError(error)
    })
  },[checkinId.id]);

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
        const url = `http://localhost:8080/api/checkin/update?id=${checkinId.id}`;
        const { data: res } = await axios.put(url, formData);
        const checkin = res;
        if(checkin)
          navigate(`/checkins`);
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
      <h1>Validate Installment</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { error && <div className='error_msg'>{error}</div> }
        </div>
        <table className='update-contract-form-table'>
          <tbody>
          <tr className='update-table-row'>
              <td><label>Chechin Number</label></td>
              <td><p className="update-values">{formData.checkinNumber}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Due Date</label></td>
              <td><p className="update-values">{formData.dueDate}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Due Amount</label></td>
              <td><p className="update-values">{formData.dueAmount}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Submit Date</label></td>
              <td><p className="update-values">{formData.submitDate}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Paid Amount</label></td>
              <td><p className="update-values">{formData.paidAmount}</p></td>
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
          <Link to={`/checkin/${checkinId.id}`} className="update-back-link">Back</Link>
          <Link to={`/checkins`} className="update-cancel-link">cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateCheckin