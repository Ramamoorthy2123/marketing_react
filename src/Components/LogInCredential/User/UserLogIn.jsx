import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";


import '../../SignUpCredential/Admin/AdminSignUp.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import iconAU from '../../../assets/iconAU.png';

const UserLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const response = await axios.post('https://marketing-fastapi.onrender.com/userlogin', {
          email: email,
          password: password
        });
  
        if (response.status === 200) {
          navigate('/form');
        } else {
          alert('Log In failed: ' + response.data.message);
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
          alert('Log In failed: ' + error.response.data.detail || 'An error occurred.');
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('Log In failed: No response from server.');
        } else {
          console.error('Error setting up request:', error.message);
          alert('Log In failed: ' + error.message);
        }
      }
    } else {
      alert('Please fill in all the details.');
    }
  };

  return (
    <>
      <main className='main'>
        
        <section className='right'>
          
          <h1>Log In </h1>
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
            <p>New Register </p>
            <Link to='/usersignup' className='already-link'>Sign Up</Link>
          </div>
          <div id='resetpassword'>
            <Link to= '/resetpassword' id='resetpassword'>Reset Password ?</Link>
          </div>
          <button 
            id='button' 
            onClick={handleSignUp}
            className='Link'
          >
            Log In
          </button>
        </section>
      </main>
    </>
  );
};

export default UserLogIn;
