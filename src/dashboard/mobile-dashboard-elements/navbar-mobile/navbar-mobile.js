import React, { useState } from 'react'
import './navbar-mobile.css'
import logo from '../../../images/Logo_FInale.png'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const NavbarMobile = ({ setChooseMobile }) =>  {
    const [clickedMenu, setClickedMenu] = useState(false)
    const navigate = useNavigate();

    const handleMenuClick = () => {
        if(clickedMenu){
            setClickedMenu(false)

        }else{
            setClickedMenu(true);
        }
    }

    const handleMenuSelect = (value) => {
        setChooseMobile(value)
        setClickedMenu(false)
    }
    

  return (
    <div className='navbar-mobile-main-container'>
        <div className='navbar-mobile-container'> 
            <div className='dashboard-logo-container-mobile'>
                <img onClick={() => navigate('/dashboard')} src={logo}/>
            </div>
            <div className='right-icon-mobile-container'>
                { clickedMenu ? <FontAwesomeIcon icon={faXmark} className='bars-icon' onClick={handleMenuClick}/> : <FontAwesomeIcon icon={faBars} className='bars-icon' onClick={handleMenuClick}/>}
            </div>
        </div>
        <div  className={`menu ${clickedMenu ? 'open' : ''}`}>
            <div className='menu-container'>
                <div className='user-info-mobile-container'>
                    <div className='user-info-data-container'>
                        <div className='profile-image-container'><img src={`data:image/png;base64,${localStorage.getItem('profile_image')}`} className='profile-image'/></div>
                    </div>
                    <div className='user-info-data-container'>
                        <p>{localStorage.getItem('username')}</p>
                    </div>
                </div>
                <div className='menu-section-container' >
                    <p onClick={() =>handleMenuSelect("generale")}>Dashboard</p>
                </div>
                <div className='menu-section-container' >
                    <p  onClick={() => handleMenuSelect("incassi")}>Incassi</p>
                </div>
                <div className='menu-section-container' >
                    <p onClick={() => handleMenuSelect("dipendenti")}>Dipdendenti</p>
                </div>
                <div className='logout-menu-container'>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default NavbarMobile