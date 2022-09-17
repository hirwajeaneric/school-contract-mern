  import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';

const ContractSummary = () => {
  return (
    <div className='summary-container'>
      <h1>Contract Summary</h1>
      {/* <div className='error-message-box'>
        <p className='error_msg'>Error Message Here</p>
      </div> */}
      <div className='student-identification'>
        <p>Student number:<span>22022</span></p>
        <p>Name:<span>Belyse Mucyo</span></p>
      </div>
      <table className='summary-table'>
        <thead>
          <tr>
            <th></th>
            <th>Amount Due</th>
            <th>Paid Amount</th>
            <th>September 30, 2021</th>
            <th>October 30, 2021</th>
            <th>November 30, 2021</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Amount</td>
            <td>300000</td>
            <td>200000</td>
            <td>33333</td>
            <td>33333</td>
            <td>33333</td>
          </tr>
        </tbody>
      </table>
      <p>
        I <span>Belyse Mucyo</span> hereby acknowledge that as of <span>Friday, August 26, 2022</span>, I registered with the Adventist University Of Central Africa with <span>6</span> credits and I promise to pay the total amount of the school fees on installment payment a t the dates as specified above. <br/><br/>
        I accept and fully understand that tuition and fees paid upon registration is not refundable on whatever reason and that 5% penalty per month on the amount due will be charged on delayed payment. 
      </p>
      <div className='buttons'>
        <Link className='summary-btn' to={'/new-contract'}>Back</Link>
        <button className='submit-btn' type='submit'>Submit</button>
      </div>
    </div>
  )
}

export default ContractSummary