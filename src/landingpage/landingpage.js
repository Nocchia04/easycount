import React from 'react'
import './landingpage.css'
import Navbar from '../navbar/navbar'
import landingimage from '../images/Image_slide.png'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <div className='top-slide-container'>
        <div>
            <p className='slogan-paragraph'>Easy Count, i tuoi guadagni a portata di tocco</p>
            <p className='start-now-button'>Inizia ora!</p>
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
                <p>Monitora con facilità l’andamento della tua attività</p>
            </div>
        </div>
        </div>
        <div className='contact-form-container'>
                <div className='contact-header-container'> 
                <p>Contattaci</p>
                </div>
            <div className='form-section-container'>
                <div className='landing-form-container'>
                    <div>
                    <input className='landing-form-input-short' placeholder='nome'/>
                    <input className='landing-form-input-short' placeholder='cognome'/>
                    </div>
                    <input className='landing-form-input-long' placeholder='email'/>
                    <textarea className='landing-form-input-textarea' placeholder='Inviaci una richiesta, ti faremo sapere prima possibile'/>
                    <button className='send-request'>Invia</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
