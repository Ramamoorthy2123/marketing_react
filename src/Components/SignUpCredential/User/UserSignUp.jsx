import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

// import './UserSignUp.css';
import '../Admin/AdminSignUp.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from '../../Navbar/Navbar';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email && username && password) {
      try {
        // Sending a POST request to the FastAPI backend on localhost
        const response = await axios.post('https://marketing-fastapi.onrender.com/usersignup', {
          email: email,
          username: username,
          password: password
        });

        if (response.status === 201) {
          // Successfully signed up, redirect to the login page
          navigate('/userlogin');
        } else {
          // Handle other responses
          alert('Sign-up failed, please try again.');
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
        alert('An error occurred during sign-up. Please try again.');
      }
    } else {
      // Some fields are missing, show an alert
      alert('Please fill in all the details.');
    }
  };

  return (
    <>
   
      <main className='main'>
       
        <section className='right'>
        
         <h1>Sign Up</h1>
          <div>
            <label htmlFor="email">
              <AiOutlineMail />
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="username">
              <FaRegUserCircle />
              Username
            </label>
            <input 
              type="text" 
              id='username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="password">
              <RiLockPasswordLine />
              Password
            </label>
            <input 
              type="password" 
              id='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div id='already'>
            <p>Already have an account? </p>
            <Link to='/userlogin' className='already-link'>Log In</Link>
          </div>
          <button 
            id='button' 
            onClick={handleSignUp}
            className='Link'
          >
            Sign Up
          </button>
        </section>
      </main>
    </>
  );
};

export default UserSignUp;
