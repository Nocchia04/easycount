import React from 'react'
import './dashboard.css'
import Navbar from '../navbar/navbar'
import DashboardNavbar from './dashboard-navbar/dashboardnavbar'

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <DashboardNavbar/>
      <div className='content-section'>
        <div className='left-navigation-bar-container'>
          <div><p>Dashboard</p></div>
          <div><p>Incassi</p></div>
          <div><p>Operatori</p></div>
        </div>
        <div>Contenuto</div>
      </div>
    </div>
  )
}

export default Dashboard
