import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,  Redirect, useNavigate, redirect } from 'react-router-dom';
import LandingPage from './landingpage/landingpage';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Settings from './settings/settings';
import { useEffect, useState } from 'react';
import SettingsIncassi from './settings/settingsIncassi/settingsIncassi';
import SettingsDipendenti from './settings/settingsDipendenti/settingsDipendenti';


function App() {
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const user_id = localStorage.getItem('user_id');
    if(access_token && user_id){
      console.log('user is logged in');
    }else{
      console.log('user is not logged in');
    }
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={localStorage.getItem('access_token') ? <Dashboard/> : <Login/>}/>
        <Route path='/settings' element={localStorage.getItem('access_token') ? <Settings/> : <Login/>}/>
        <Route path='/settings/incassi' element={localStorage.getItem('access_token') ? <SettingsIncassi/> : <Login/>}/>
        <Route path='/settings/dipendenti' element={localStorage.getItem('access_token') ? <SettingsDipendenti/> : <Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
