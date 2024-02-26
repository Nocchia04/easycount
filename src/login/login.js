import React, { useState } from 'react'
import Navbar from '../navbar/navbar';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isLoading, setLoadingActive] = useState(false)
  const [usernamePasswordError, setUsernamePasswordError] = useState('correct')

  const navigate = useNavigate()

  const hadleLogin = () => {
    setLoadingActive(true);
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/login/', formdata).then((response) => {
      if(response.data.status == 'success'){
        const access_token = response.data.access;
        const refresh_token = response.data.refresh;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user-info', response.data.user_info)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('profile_image', response.data.profile_image)
        navigate('/dashboard')
        window.location.reload();
        setLoadingActive(false);
      }else{
        setLoadingActive(false);
        setUsernamePasswordError("error")
      } 
    })
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {isLoading === true && (
          <div className='overlay'>
              <div className='spinner'>
              <ColorRing
                  colors={['white', 'white', 'white', 'white', 'white']}
                  />
              </div>
          </div>
      )}
      <Navbar/>
      <div className='login-page-container'>
        <div className='login-background-image-container'>
            <div className='login-form'>
                <p>Accedi</p>
                {
                  usernamePasswordError == "error" ? 
                  <div className='credentials-error-container'>
                    <h6 className='credentials-error-message'>Ops! Qualcosa è andato storto, ricontrolla username e password!</h6>
                  </div> : <div></div>
                }
                <div className='login-form-container'>
                  <input className='login-form-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='login-form-container'>
                    <input className='login-form-input-pass' type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <div className='eye-container'>
                      <FontAwesomeIcon className='eye' icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility}/>
                    </div>
                </div>
                <button onClick={hadleLogin}>Accedi</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
