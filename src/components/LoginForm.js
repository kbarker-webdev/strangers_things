import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { successMsg } from '.';
import './LoginForm.css'


const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            user: {
            username: userName,
            password: password
            }
          };
        let res = await loginUser(userData)
        if (res !== "Could not login.") {
            localStorage.setItem('token', res);
            navigate('/profile');
            successMsg("You have been logged in.")
        } else {
            alert(res)
        }
        useNavigate('/profile');
    }

    return (<div id='login'>
        <form id="login_form" onSubmit={handleSubmit}>
            <input 
                placeholder='Username'
                type="text" 
                id="username"
                onChange={(e) => setUserName(e.target.value)}></input>

            <br></br>            
            <input 
                placeholder='Password'
                type="password" 
                id="psswrd"
                onChange={(e) => setPassword(e.target.value)}></input>
            <br></br>   
            <button id="submit" type="submit">Log In</button>
            <a id="register" href="/register">Register Here</a>

            
        </form>
        </div>
    )
}

export default LoginForm;