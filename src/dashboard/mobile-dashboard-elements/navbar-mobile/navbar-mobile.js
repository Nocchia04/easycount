import React, { useState } from 'react'
import './navbar-mobile.css'
import logo from '../../../images/Logo_FInale.png'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const NavbarMobile = ({ setChooseMobile }) =>  {
    const [clickedMenu, setClickedMenu] = useState(false)
    const [isLoading, setLoadingActive] = useState(false)
    const [menuClicked, setMenuClicked] = useState('generale')
    const navigate = useNavigate();

    const handleMenuClick = () => {
        if(clickedMenu){
            setClickedMenu(false)

        }else{
            setClickedMenu(true);
        }
    }

    const handleMenuSelect = (value) => {
        setMenuClicked(value)
        setChooseMobile(value)
        setClickedMenu(false)
    }

    const logout = () => {
        setLoadingActive(true);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload()
        console.log('user is logged out');
    
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
                <div className='user-info-mobile-container' onClick={() => navigate('/settings')}>
                    <div className='user-info-data-container'>
                        <div className='profile-image-container'><img src={`data:image/png;base64,${localStorage.getItem('profile_image')}`} className='profile-image'/></div>
                    </div>
                    <div className='user-info-data-container'>
                        <p>{localStorage.getItem('username')}</p>
                    </div>
                </div>
                <div className={menuClicked==='generale' ? 'menu-section-container selected' : 'menu-section-container'} onClick={() =>handleMenuSelect("generale")} >
                    <p>Dashboard</p>
                </div>
                <div className={menuClicked==='incassi' ? 'menu-section-container selected' : 'menu-section-container'} onClick={() => handleMenuSelect("incassi")}>
                    <p>Incassi</p>
                </div>
                <div className={menuClicked==='dipendenti' ? 'menu-section-container selected' : 'menu-section-container'} onClick={() => handleMenuSelect("dipendenti")}>
                    <p>Dipdendenti</p>
                </div>
                <div className='menu-section-container'onClick={() => navigate('/settings')}>
                    <p>Impostazioni</p>
                </div>
                <div className='logout-menu-container' onClick={logout}>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default NavbarMobile
