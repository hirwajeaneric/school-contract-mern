import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { savingOne, savingTwo, savingThree } from '../../../services/createCheckins';
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

  const [acontract, setAcontract] = useState({
    regNumber: "",
    urubutoPayCode: "",
    dueAmount: "",
    paidAmount: "",
    amountPerInstallment: "",
    email: "",
    sponsorEmail: "",
    status: "",
    creationDate: "",
    comment: "",
    contractId: ""
  });

  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.status === "Pending"){
      setError("Status must be updated!");
      return;
    } else {
      const url = `http://localhost:8080/api/contracts/update?id=${contractId.id}`;
      
      axios.put(url, formData)
      .then((res) => {
        const contractData = res.data;
        console.log(contractData);
        setAcontract((acontract) => ({ 
          contractData
        }))
        // setAcontract((acontract) => ({
        //   ...acontract, 
        //   contractData
        // }))
      })
      .catch (error => {
        if(error.response && error.response.status >= 400 && error.response.status <= 500){
            setError(error.response.data.message);
        }}
      )
      // console.log("New contract : ",acontract);
    }

    // var contractCreatedOn = contract.creationDate;
    // var convertedDate = new Date(contractCreatedOn);

    // convertedDate.setDate(convertedDate.getDate()+30);
    // var date1 = convertedDate.toDateString();
    // convertedDate.setDate(convertedDate.getDate()+30);
    // var date2 = convertedDate.toDateString();
    // convertedDate.setDate(convertedDate.getDate()+30);
    // var date3 = convertedDate.toDateString();

    // // Installment data
    // const firstInstallment = {
    //     regNumber: contract.regNumber,
    //     contractId: contract._id,
    //     checkinNumber: "1", 
    //     urubutoPayCode: "",
    //     dueAmount: contract.amountPerInstallment,
    //     paidAmount: 0,
    //     dueDate: date1,
    //     submitDate: "",
    //     status: "Pending",
    //     comment: "" 
    // }

    // const secondInstallment = {
    //     regNumber: contract.regNumber,
    //     contractId: contract._id,
    //     checkinNumber: "2", 
    //     urubutoPayCode: "",
    //     dueAmount: contract.amountPerInstallment,
    //     paidAmount: 0,
    //     dueDate: date2,
    //     submitDate: "",
    //     status: "Pending",
    //     comment: "" 
    // }

    // const thirdInstallment = {
    //     regNumber: contract.regNumber,
    //     contractId: contract._id,
    //     checkinNumber: "3", 
    //     urubutoPayCode: "",
    //     dueAmount: contract.amountPerInstallment,
    //     paidAmount: 0,
    //     dueDate: date3,
    //     submitDate: "",
    //     status: "Pending",
    //     comment: "" 
    // }

    // if(contract.status === "Approved"){
    //   savingOne(firstInstallment);
    //   savingTwo(secondInstallment);
    //   savingThree(thirdInstallment);
    // } else {
    //   console.log("Send a reject message!");
    // }

    console.log(acontract);

    if(acontract)
      navigate(`/contracts`);
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