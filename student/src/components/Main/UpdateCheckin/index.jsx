import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const UpdateCheckin = () => {  

  const navigate = useNavigate();
  const[checkinData, setCheckinData] = useState({
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

  const [errors, setErrors] = useState("");

  const checkinId = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/checkin/findById?id=${checkinId.id}`)
    .then((res) => {
      console.log(res.data);
      setCheckinData(res.data)
    })
    .catch(error => {
      setErrors(error)
    })
  },[checkinId.id]);

  const handleChange = ({currentTarget: input })=>{
    setCheckinData({...checkinData, [input.name]: input.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkinData.status === "Pending"){
      setErrors("Status must be updated!");
      return;
    } else {
      try {
        const url = `http://localhost:8080/api/checkin/update?id=${checkinId.id}`;
        const { data: res } = await axios.put(url, checkinData);
        const checkin = res;
        if(checkin)
          navigate(`/checkins`);
      } catch (error) {
          if(
              error.response &&
              error.response.status >= 400 && 
              error.response.status <= 500
          ){
              setErrors(error.response.data.message);
          }
      }
    }
  }

  return (
    <div className='form-container'>
      <h1>Update checkin</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { errors && <div className='error_msg'>{errors}</div> }
        </div>
        <table className='update-contract-form-table'>
          <tbody>
            <tr className='update-table-row'>
              <td><label>Chechin Number</label></td>
              <td><p className="update-values">{checkinData.checkinNumber}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Due Date</label></td>
              <td><p className="update-values">{checkinData.dueDate}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Due Amount</label></td>
              <td><p className="update-values">{checkinData.dueAmount}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Status</label></td>
              <td><p className="update-values">{checkinData.status}</p></td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Paid Amount</label></td>
              <td>
                <input 
                type="text" 
                  className='form-input'
                  name="paidAmount" 
                  value={checkinData.paidAmount} 
                  onChange={handleChange} />
              </td>
            </tr>
            <tr className='update-table-row'>
              <td><label>Urubuto Payment Code</label></td>
              <td>
                <input 
                type="text" 
                  className='form-input'
                  name="urubutoPayCode" 
                  value={checkinData.urubutoPayCode} 
                  onChange={handleChange} />
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className='buttons'>
          <Link className='summary-btn' to={'/checkins'}>Submit</Link>
          <Link className='cancel-btn' to={'/checkins'}>Back</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateCheckin