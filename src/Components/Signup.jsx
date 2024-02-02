import axios from "axios";
import { useState } from "react";
import React  from 'react';
import { useNavigate } from "react-router-dom"


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
        const response = await axios.post('http://localhost:3000/user_register', {
          name: name,
          email: email,
          password: password,
          roleid : '3',
        });
        if(response){
       // alert('user Register successfully');
        navigate('/login');
        }
       // console.log(response.data.message); // You can handle the response accordingly
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration failure, display error message, etc.
      }
    };
  return (
    <div className="App">
        <div className="login-card-container">
          <div className="login-card" >
            <h2  > Sign Up </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button onClick={handleRegister} className="login-button">
              SignUp
            </button>
          </div>
        </div>
      </div>
  );
};

export default Signup;
