import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

const Login = () => {
    const [data, setData] = useState({
        regNumber:"",
        password:""
    });

    const [error, setError] = useState("");
    
    const handleChange = ({currentTarget: input })=>{
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/student/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            localStorage.setItem('id', res.regNumber);
            localStorage.setItem('name', res.name);
            window.location = "/"
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
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <div className={styles.auca_logo}></div>
                    <h1>AUCA CONTRACT</h1>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Registration Number"
                            name='regNumber'
                            onChange={handleChange}
                            value={data.regNumber} 
                            required   
                        />
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="password"
                            name='password'
                            onChange={handleChange}
                            value={data.password} 
                            required   
                        />
                        { error && <div className={styles.error_msg}>{error}</div> }
                        <button type='submit' className={styles.green_btn}>Sign In</button>
                    </form>
                    <div className={styles.bottom}>
                        <span className='already_have_account'>New Here? <Link to='/signup' className={styles.links}>Sign Up</Link></span>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Login