import React from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

const Signup = () => {
    const [data, setData] = useState({
        regNumber:"",
        name: "",
        email: "",
        sponsorEmail:"",
        password:""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input })=>{
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to='/login'>
                        <button type='button' className={styles.white_btn}>Sign In</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
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
                            type="text" 
                            className={styles.input} 
                            placeholder="Name"
                            name='name'
                            onChange={handleChange}
                            value={data.name} 
                            required   
                        />
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Email"
                            name='email'
                            onChange={handleChange}
                            value={data.email} 
                            required   
                        />
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Sponsor Email"
                            name='sponsorEmail'
                            onChange={handleChange}
                            value={data.sponsorEmail} 
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
                        <button type='submit' className={styles.green_btn}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup