import React, { useState } from 'react'
import Navbar from '../navbar/navbar';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isLoading, setLoadingActive] = useState(false)

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
        setLoadingActive(false);
        window.location.reload();
      } 
    })
  }

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
                <input className='login-form-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input className='login-form-input' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={hadleLogin}>Accedi</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
