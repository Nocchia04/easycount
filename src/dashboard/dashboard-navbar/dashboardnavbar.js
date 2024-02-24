import React from 'react'
import './dashboardnavbar.css'
import logo from '../../images/Logo_FInale.png'
import { redirect, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner';
import { useState } from 'react';

function DashboardNavbar() {
    const navigate = useNavigate()
    const [isLoading, setLoadingActive] = useState(false)

    const logout = () => {
        setLoadingActive(true);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload()
        console.log('user is logged out');
    
    }
  return (
        <div className='dashboard-navbar-container'>
            {isLoading === true && (
                <div className='overlay'>
                    <div className='spinner'>
                    <ColorRing
                        colors={['white', 'white', 'white', 'white', 'white']}
                        />
                    </div>
                </div>
            )}
            <div className='dashboard-logo-container'>
                <img onClick={() => navigate('/dashboard')} src={logo}/>
            </div>
            <div className='dashboard-navigation-container'>
                <div className='dashboard-navigation-button-container'>
                    <p>{localStorage.getItem('username')}</p>
                </div>
                <div className='dashboard-logout-container'>
                    <p className='logout-text' onClick={logout}>Logout</p>
                </div>
                <div className='p-i-container'>
                    <div className='profile-image-container'><img src={`data:image/png;base64,${localStorage.getItem('profile_image')}`} className='profile-image'/></div>
                </div>
            </div>
        </div>
  )
}

export default DashboardNavbar
