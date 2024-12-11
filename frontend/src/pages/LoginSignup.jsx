import React, { useState } from 'react';
import './css/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('username', data.username);
        navigate('/');
      } else {
        alert(data.error);
        console.log(data.error);
      }
      
    } catch (e) {
      console.log('Error', e);
    } finally {
      setLoading(false);
    }
    
  }

  const signup = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('username', data.username);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch(e) {
      console.log('Error', e);
    } finally {
      setLoading(false);
    }
    
    
  }

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className="loginsignup">
        <div className="container">
            <h1>{state}</h1>
            <div className="fields">
                { state === 'Sign Up' ? <input type="text" placeholder='Your Name' name='username' value={formData.username} onChange={changeHandler} /> : <></> }
                <input name='email' type="email" placeholder='Email Address' value={formData.email} onChange={changeHandler} />
                <input name='password' type="password" placeholder='Password' value={formData.password} onChange={changeHandler} />
            </div>
            <button onClick={() => state === 'Login' ? login() : signup()} disabled={loading || !check}>{loading ? 'Wait...' : 'Continue'}</button>
            {state === 'Sign Up' ? (
              <p className="login">Already have an account? <span onClick={() => setState('Login')}>Login Here</span></p> 
            ): (
              <p className="login">Create an account? <span onClick={() => setState('Sign Up')}>Sign Up Here</span></p>
            )}
            
            <div className="agree">
                <input type="checkbox" name="" id="" value={check} onChange={(e) => setCheck(e.target.checked)}/>
                <p>By continuing I agree to the terms of use and privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup;