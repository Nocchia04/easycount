import React, { useState } from 'react'
import './landingpage.css'
import Navbar from '../navbar/navbar'
import landingimage from '../images/Image_slide.png'
import axios from 'axios'

function LandingPage() {

    const sendEmail = () => {
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('surname', surname);
        formdata.append('email', email);
        formdata.append('description', description);

        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/send_mail/', formdata).then((response) => {
            console.log(response);
            window.location.reload();
        })

    }

    const [ name, setName] = useState('')
    const [ surname, setSurname ] = useState('')
    const [ email, setEmail] = useState('')
    const [ description, setDescription ] = useState('')

    const scroller = () => {
        document.getElementById('contattaci').scrollIntoView({
            behavior: 'smooth'
        })
    }
  return (
    <div>
      <Navbar/>
      <div className='top-slide-container'>
        <div className='top-slide-slogan'>
            <div className='slogan-paragraph-container'>
                <p className='slogan-paragraph'>Easy Count, i tuoi guadagni a portata di tocco</p>
            </div>
            <div className='start-now-container' onClick={scroller}>
                <p className='start-now-button'>Inizia ora!</p>
            </div>
        </div>
        <div className='top-slide-image-container'>
            <img src={landingimage}/>
        </div>
      </div>
      <div className='why-easycount-container'>
        <div className='why-easycount-header'>
            <p>Perché Easy Count?</p>
        </div>
        <div className='why-easycount-points-container'>
            <div className='why-easycount-point'>
                <div><p>1</p></div>
                <p>Accedi ai tuoi incassi ovunque e in qualsiasi momento</p>
            </div>
            <div className='why-easycount-point'>
                <div>
                    <p>2</p>
                </div>
                <p> Velocizza il processo di inserimento</p>
            </div>
            <div className='why-easycount-point'>
                <div><p>3</p></div>
                <p>Monitora con facilità l'andamento della tua attività</p>
            </div>
        </div> 
        </div>
        <div className='contact-form-container'>
                <div className='contact-header-container'> 
                <p id="contattaci">Contattaci</p>
                </div>
            <div className='form-section-container'>
                <div className='landing-form-container'>
                    <div>
                    <input className='landing-form-input-short' placeholder='Nome' onChange={(e) => setName(e.target.value)}/>
                    <input className='landing-form-input-short' placeholder='Cognome' onChange={(e) => setSurname(e.target.value)}/>
                    </div>
                    <input className='landing-form-input-long' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                    <textarea className='landing-form-input-textarea' placeholder='Inviaci una richiesta, ti faremo sapere prima possibile' onChange={(e) => setDescription(e.target.value)}/>
                    <button className='send-request' onClick={sendEmail}>Invia</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
