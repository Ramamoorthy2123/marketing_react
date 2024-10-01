import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
// import './ResetPassword.css';
import '../SignUpCredential/Admin/AdminSignUp.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (email) {
      try {
        const response = await axios.post('https://marketing-fastapi.onrender.com/resetpassword', { email });
        if (response.status === 200) {
          setMessage('Password reset link sent to your email.');
        }
      } catch (error) {
        console.error('Error during password reset:', error.response ? error.response.data : error.message);
        setMessage('Failed to send password reset link. Please try again.');
      }
    } else {
      setMessage('Please enter your email.');
    }
  };

  return (
    <main className='main reset-main'>
      <section className='right'>
        <h1>Reset Your Password</h1>
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
        <button 
        className='Link'
          id='button' 
          onClick={handleReset}
        >
          Send 
        </button>
        {message && <p>{message}</p>}
        <div>
          <Link to='/adminlogin' className='back-link'>Back to Log In</Link>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
