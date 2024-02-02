// require('dotevn').config();
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// const Dotenv = require('dotenv')


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    //const localhost = process.env.REACT_APP_API_ADDRESS;  
   // console.log(process.env.VITE_APP_API_ADDRESS);

    const navigate = useNavigate();
    //const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });
    const getCurrentDateTime = () => {
        const now = new Date();
    
        // Extract year, month, and day components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
    
        // Combine components into 'YYYY-MM-DD' format
        const formattedDateTime = `${year}-${month}-${day}`;
    
        return formattedDateTime;
    };
    
    const fetchCurrentTime = () => {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return formattedDateTime;
    };

    const currentTime = fetchCurrentTime();
    const currentdate = getCurrentDateTime();

    const validateMobile = (mobile) => {
        // Use a regular expression for 10-digit mobile number validation
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const validatePassword = (password) => {
        // Password should be at least 6 characters long
        return password.length >= 6;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };


    const handleLogin = async () => {


        // Validate email
        if (!validateMobile(email)) {
            setEmailError('Invalid mobile no');
            return;
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password should be at least 6 characters long');
            return;
        }
        try {
            const response = await axios.post(`${process.env.VITE_APP_API_ADDRESS}/loginnew`, {

                email: email,
                password: password,
                logintime: currentTime,
                date: currentdate
            });
            // console.warn(response);
            
            if (response.data.result === "No user Found") {
                alert("User not Found")
            }
            if (response && response.data && response.data.user) {
                const userData = response.data.user;

                // Store only the relevant user data in localStorage
                const userToStore = {
                    id: userData.id,
                    name: userData.name,
                    roleid: userData.roleid,
                    email: userData.email,
                    logintime: currentTime,
                };
                const storageKey = 'user';
                const userString = JSON.stringify(userToStore);
                localStorage.setItem(storageKey, userString);
                // localStorage.setItem("user",JSON.stringify(result.user));
                // Navigate or perform other actions if needed 
                navigate('/');
            } else {
                console.log('No user information found in API response.');
            }
            // console.log(response.data.message); // You can handle the response accordingly
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Handle the case where the server responds with a 404
                 alert("Wrong email or pawword");
            } else {
                console.error('Login failed:', error);
                // Handle registration failure, display error message, etc.
            }
        }

    };

    return (
        <div className="App">
            <div className="login-card-container">

                <div className="login-card" >
                    <h2  > Login </h2>
                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                    {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
                    <input
                        type="text"
                        placeholder="Email ID"
                        value={email}
                        onChange={handleEmailChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="login-input"
                    />
                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                </div>

            </div>
        </div>


    );
};

export default Login;