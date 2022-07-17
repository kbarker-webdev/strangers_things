import React, { useState } from 'react';
import { registerUser } from '../api';
import './RegisterForm.css'
import { successMsg } from '.';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [ user, setUser ] = useState({});
    const [confirmPassword, setconfirmPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== confirmPassword) {
            alert(`Passwords do not match`);
        } else {
            const userData = {
                user: {
                username: user.username,
                password: user.password
                }
              };
            registerUser(userData).then((res) => {
                localStorage.setItem("token", res);
                successMsg('Registered successfully.');
                navigate('/home/');
            });
            ;
            
        }
        
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
          });
    }
    

    return (<div id="register">
        <form id="register_form" onSubmit={(e) => handleSubmit(e)}>
                <input required
                placeholder='Username'
                minLength="5"
                type="text" 
                id="uname"
                name="username"
                onChange={(e) => handleChange(e)}></input>

                <br></br> 
            
                <input required
                placeholder='Password'
                minLength="5"
                type="password" 
                id="pwrd"
                name="password"
                onChange={(e) => handleChange(e)}></input>

                <br></br> 

                <input required
                placeholder='Confirm Password'
                minLength="5"
                type="password" 
                id="pwrd2"
                onChange={(e) => setconfirmPassword(e.target.value)}></input>

                <br></br> 
            
            <button id="submit" type="submit">Register</button>
        </form>
        </div>

    )
}

export default RegisterForm;