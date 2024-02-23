import React from 'react'
import './dashboardnavbar.css'
import logo from '../../images/Logo_FInale.png'
import { redirect, useNavigate } from 'react-router-dom'

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload()
    console.log('user is logged out');

}

function DashboardNavbar() {
    const navigate = useNavigate()
  return (
        <div className='dashboard-navbar-container'>
            <div className='dashboard-logo-container'>
                <img onClick={() => navigate('/dashboard')} src={logo}/>
            </div>
            <div className='dashboard-navigation-container'>
                <div className='dashboard-navigation-button-container'>
                    <p>{localStorage.getItem('username')}</p>
                </div>
                <div>
                    <p onClick={logout}>logout</p>
                </div>
                <div className='p-i-container'>
                    <div className='profile-image-container'><img src={`data:image/png;base64,${localStorage.getItem('profile_image')}`} className='profile-image'/></div>
                </div>
            </div>
        </div>
  )
}

export default DashboardNavbar
