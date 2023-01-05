import React, { useEffect } from 'react';
import { useState } from 'react';
import '../Settings/styles.css';
import { AiOutlineEdit} from 'react-icons/ai';
import axios from 'axios';


const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [errors, setErrors] = useState({ academicYear: '', semester: '', acceptedAmount: '', setupDate: '' });
  const [otherError, setOtherError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [aSetup, setASetup] = useState({ academicYear: '', semester: '', acceptedAmount: 0, setupDate: new Date().toDateString()});
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contractSetup/list`)
    .then(response => {
      setSettings(response.data);
    })
    .catch(error => {
      setOtherError(error);
    })
  },[])

  const populateInputs = ({currentTarget: input}) => {
    setASetup({...aSetup, [input.name]: input.value});
    console.log(aSetup);
  }

  const submitForm = (e)=>{
    e.preventDefault();

    if (!aSetup.academicYear) {
      setErrors({...errors, academicYear : 'AcademicYear is required'})
      return;
    } else if (!aSetup.semester) {
      setErrors({...errors, semester : 'Semester is required'})
    } if (aSetup.acceptedAmount === 0) {
      setErrors({...errors, acceptedAmount : 'Accepted amount is required'})
      return;
    } else if (aSetup.acceptedAmount < 50) {
      setErrors({...errors, acceptedAmount : 'Accepted rate can not be less than 50%'})
      return;
    } else {
      
      setOtherError('');
      setErrors({ academicYear: '', semester: '', acceptedAmount: '', setupDate: '' });
      setASetup({ academicYear: '', semester: 'Choose semester', acceptedAmount: 0, setupDate: new Date().toDateString() })

      axios.post('http://localhost:8080/api/contractSetup/new', aSetup)
      .then(response => {
        setSuccessMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch(error => {
        setOtherError(error);
      })

    }
  } 

  const updateSettings = (e) => {
    e.preventDefault();

    console.log('Setup to be updated!');
    console.log(aSetup);

    if (!aSetup.academicYear) {
      setErrors({...errors, academicYear : 'AcademicYear is required'})
    } else if (!aSetup.semester) {
      setErrors({...errors, semester : 'Semester is required'})
    } if (aSetup.acceptedAmount === 0) {
      setErrors({...errors, acceptedAmount : 'Accepted amount is required'})
    } else if (aSetup.acceptedAmount < 50) {
      setErrors({...errors, acceptedAmount : 'Accepted rate can not be less than 50%'})
    } else {
      
      setOtherError('');
      setErrors({ academicYear: '', semester: '', acceptedAmount: '', setupDate: '' });
      setASetup({ academicYear: '', semester: 'Choose Semester', acceptedAmount: 0, setupDate: new Date().toDateString() })
  
      axios.put(`http://localhost:8080/api/contractSetup/update?id=${aSetup._id}`, aSetup)
      .then(response => {
        setSuccessMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch(error => {
        setOtherError(error);
      })

    }
  }

  if(successMessage !== '') {
    setTimeout(()=>{
      setSuccessMessage('');
      window.location.reload();
    }, 5000)
  }

  return (
    <div className='settings_container'>
        <h1>Settings</h1>
        <div className='content_container'>
          <h3>This semester payment rate</h3>
          <div className='settings_list'>
            {settings.length<1 && <p className='no-settings'>No settings available</p>}
            {settings && 
              settings.map((element, index)=>(
              <div key={index} className='a_setting'>
                <div className='data'>
                  <div className="s_left">
                    <p><span>Academic year</span>{element.academicYear}</p>
                    <p><span>Semester</span>{element.semester}</p>
                  </div>
                  <div className="s_right">
                    <p><span>Rate</span>{element.acceptedAmount}</p>
                    <p><span>Created on</span>{element.setupDate}</p>
                  </div>
                  <div className='modificaiton_buttons'>
                    <button onClick={() => setASetup(element)}><AiOutlineEdit aria-label='Edit'/></button>
                    {/* <button><AiFillDelete/></button> */}
                  </div>
                </div>
              </div>))  
            }
          </div>

          <form className='setting_form' onSubmit={submitForm}>
            {otherError && <p className='otherError'>{otherError}</p>}
            {successMessage && <p className='successMessage'>{successMessage}</p>}
            <h3>Add / Update Setups</h3>
            <div className='input_container'>
              <label htmlFor="academicYear">Academic year *</label>
              <input type="text" name="academicYear" onChange={populateInputs} value={aSetup.academicYear} id="academicYear" placeholder='Academic year'/>
              <p className='input_error'>{errors.academicYear && errors.academicYear}</p>
            </div>
            <div className='input_container'>
              <label htmlFor="semester">Semester *</label>
              <select type="text" name="semester" onChange={populateInputs} id="semester" placeholder='Semester'>
                <option value="">Choose semester</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Summer">Summer</option>
              </select>
              <p className='input_error'>{errors.semester && errors.semester}</p>
            </div>
            <div className='input_container'>
              <label htmlFor="acceptedAmount">Rate/100 *</label>
              <input type="text" name="acceptedAmount" onChange={populateInputs} value={aSetup.acceptedAmount} id="acceptedAmount" placeholder='Accepted rate'/>
              <p className='input_error'>{errors.acceptedAmount && errors.acceptedAmount}</p>
            </div>
            <div className='command_buttons'>
              <input type="submit" value="SAVE" />
              <button type='button' onClick={updateSettings}>UPDATE</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Settings