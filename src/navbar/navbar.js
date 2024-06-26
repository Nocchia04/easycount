import React from 'react'
import logo from '../images/Logo_FInale.png'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

  return (
    <div className='navbar-container'>
        <div className='logo-container'>
            <img onClick={() => navigate('/')} src={logo}/>
        </div>
        <div className='navigation-container'>
            <div className='navigation-button-container'>
                <p className='navbar-section'>About</p>
            </div>
            <div className='navigation-button-container' onClick={() => navigate('/login')}>
                <p className='navbar-section'>Sign in</p>
            </div>
            <div className='signup-container'>
                <p>Inizia</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar
