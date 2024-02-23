import React from 'react'
import './settings.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../dashboard/dashboard-navbar/dashboardnavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDollar, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 
function Settings() {

  const [img, setImg] = useState(true);
  const [edit, setEdit] = useState(true);
  const [nameValue, setNameValue] = useState(localStorage.getItem('username'));

  const handleNameChange = (event) => {
    setNameValue(event.target.value)
  };

  const sendNewUsername = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'));
    formdata.append('username', nameValue)
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/change_username/', formdata).then((response) => {
      if(response.data.status == "success"){
        console.log(response.data.data.username)
        localStorage.setItem("username", response.data.data.username)
        window.location.reload()
      }
    })
  }

  const handleImageUpload = (e) => {
    const formdata = new FormData();
    const image = e.target.files[0]
    console.log(image)
    formdata.append('id', localStorage.getItem('user_id'))
    formdata.append('profile_picture', image)
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/change_profile_picture/', formdata).then((response) => {
      if(response.data.status == "success"){
        console.log(response.data.data.profile_image.$binary.base64)
        localStorage.setItem('profile_image', response.data.data.profile_image.$binary.base64)
        window.location.reload()
      } 
    })
  }

  return (
    <div className='settings-root-display-container'>
      <div className='settings-navbar-container'>
        <DashboardNavbar/>
      </div>
      <div className='settings-image-name-container'>
        <div className='settings-image-container'>
          
          <input type='file' accept='image/*' id="fileInput" className='profile-image-uploader' onChange={(e) =>handleImageUpload(e)}/>
          <label htmlFor='fileInput' className='settings-image' onMouseEnter={() => setImg(false)} onMouseLeave={() => setImg(true)}>
            {
              localStorage.getItem('profile_image') != "" || !setImg ? <img src={`data:image/png;base64,${localStorage.getItem('profile_image')}`} className='profile-image'/> :             <FontAwesomeIcon icon={faPlus} className={img ? 'icon view': 'icon'}/>
            }
            
          </label>
        </div>
        <div className='settings-name-container'>
          <div className={edit ? 'name-container':'name-container hidden'}>
            <p className='name'>{nameValue}</p>
          </div>
          <div className={edit ? 'name-editing-container hidden':'name-editing-container'}>
            <input className='editing-name' type='text' value={nameValue} onChange={handleNameChange} />
          </div>
          <div className={edit ? 'edit-name-container' : 'edit-name-container hidden'}>
            <FontAwesomeIcon icon={faPenToSquare} className='icon' onClick={() => setEdit(false)}/>
          </div>
          <div className={edit ? 'name-end-container hidden':'name-end-container'} onClick={() => setEdit(true)}>
              <div className='end-button' onClick={() => sendNewUsername()}>
                <p className='end-text'>Salva</p>
              </div>
          </div>
          <div className={edit ? 'name-annulla-container hidden':'name-annulla-container'} onClick={() => setEdit(true)}>
              <div className='annulla-button'>
                <p className='annulla-text'>Annulla</p>
              </div>
          </div>
        </div>
      </div>

      <div className='settings-menu-container'>
        <Link to={'incassi'} className='sett-option-container'>
          <p className='sett-option-text'>Impostazioni Incassi</p>
        </Link>
        <Link to={'dipendenti'} className='sett-option-container'>
          <p className='sett-option-text'>Impostazioni Dipendenti</p>
        </Link>
      </div>
    </div>
  )
}

export default Settings