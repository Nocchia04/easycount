import React from 'react'
import './dashboardnavbar.css'
import logo from '../../images/Logo_FInale.png'

function DashboardNavbar() {
  return (
    <div>
        <div className='dashboard-navbar-container'>
            <div className='dashboard-logo-container'>
                <img src={logo}/>
            </div>
            <div className='dashboard-navigation-container'>
                <div className='dashboard-navigation-select-container'>
                    <select>
                        <option value="most-recent-date">Data ( Più recente ) </option>
                        <option value="less-recent-date">Data ( Meno recente ) </option>
                        <option value="most-relevant">Ordine crescente</option>
                        <option value="less-relevant">Ordine decrescente</option>
                    </select>
                </div>
                <div className='dashboard-navigation-button-container'>
                    <p>Nome attività</p>
                </div>
                <div className='profile-image-container'>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardNavbar
