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

    if (checkinData.paidAmount === "") {
      setErrors("Paid amount is required!");
      return;
    } else if (checkinData.paidAmount === 0 || checkinData.paidAmount === "0") {
      setErrors("Unacceptable amount entered");
      return;
    } else if (checkinData.urubutoPayCode === "") {
      setErrors("Urubuto code is required!");
      return;
    } else if (checkinData.urubutoPayCode.length < 10 || checkinData.urubutoPayCode.length > 10) {
      setErrors("Invalid Code!");
      return;
    } else {
      try {
        const url = `http://localhost:8080/api/checkin/update?id=${checkinId.id}`;
        const { data: res } = await axios.put(url, checkinData);
        const checkin = res;
        if(checkin) {
          navigate(`/checkins`);  
        }
      } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status <= 500) {
          setErrors(error.response.data.message);
        }
      }
    }
  }

  return (
    <div className='form-container'>
      <h1>Submit Installment</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='error-message-box'>
          { errors && <div className='error_msg'>{errors}</div> }
        </div>
        <table className='update-contract-form-table'>
          <tbody>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Chechin Number</label>
              </td>
              <td className='update-table-td'>
                <p className="update-values">{checkinData.checkinNumber}</p>
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Due Date</label>
              </td>
              <td className='update-table-td'>
                <p className="update-values">{checkinData.dueDate}</p>
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Due Amount</label>
              </td>
              <td className='update-table-td'>
                <p className="update-values">{checkinData.dueAmount}</p>
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Status</label>
              </td>
              <td>
                <p className="update-values">{checkinData.status}</p>
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Accountant comment</label>
              </td>
              <td className='update-table-td'>
                <p className="update-values">{checkinData.comment}</p>
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Paid Amount</label>
              </td>
              <td className='update-table-td'>
                <input 
                type="text" 
                  className='form-input'
                  name="paidAmount" 
                  value={checkinData.paidAmount} 
                  onChange={handleChange} />
              </td>
            </tr>
            <tr className='update-table-row'>
              <td className='update-table-td'>
                <label>Urubuto Payment Code</label>
              </td>
              <td className='update-table-td'>
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
        
        <div className='button-group'>
          <button type='submit' className='update-submit-btn' to={'/checkins'}>Submit</button>
          <Link className='cancel-btn' to={`/checkin/${checkinId.id}`}>Back</Link>
          <Link className='back-btn' to={'/checkins'}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UpdateCheckin