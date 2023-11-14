import React from 'react'
import Navbar from '../navbar/navbar';
import './login.css';

function Login() {
  return (
    <div>
      <Navbar/>
      <div className='login-page-container'>
        <div className='login-background-image-container'>
            <div className='login-form'>
                <p>Accedi</p>
                <input className='login-form-input' placeholder='email'/>
                <input className='login-form-input' placeholder='password'/>
                <button>Accedi</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
