import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

// import './AdminLogIn.css';
import '../../SignUpCredential/Admin/AdminSignUp.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import iconAU from '../../../assets/iconAU.png';
import bcrypt from 'bcryptjs';

const AdminLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post('https://marketing-fastapi.onrender.com/adminlogin', {
          email: email,
          password: password  // Send raw password here
        });
  
        if (response.status === 200) {
          navigate('/admin');  // Redirect on success
        } else {
          alert('Login failed, please check your credentials.');
        }
      } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        alert('An error occurred during login. Please try again.');
      }
    } else {
      alert('Please fill in both email and password.');
    }
  };
  
    

  return (
    <>
      
      <main className='main'>
       
        <section className='right'>
          
          <h1>Log In</h1>
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
            <p>New Register? </p>
            <Link to='/adminsignup' className='already-link'>Sign Up</Link>
          </div>
          <div id='resetpassword'>
            <Link to= '/resetpassword' id='resetpassword'>Reset Password ?</Link>
          </div>
          <button 
            id='button' 
            onClick={handleLogin}
            className='Link'
          >
            Log In
          </button>
        </section>
      </main>
    </>
  );
};

export default AdminLogIn;
