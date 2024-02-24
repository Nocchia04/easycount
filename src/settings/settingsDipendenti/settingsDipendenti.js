import React, { useEffect } from 'react'
import './settingsDipendenti.css'
import DashboardNavbar from '../../dashboard/dashboard-navbar/dashboardnavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPinLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Joyride from 'react-joyride';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';




function SettingsDipendenti() {

  const [params, setParams] = useState({});
  const [composite, setComposite] = useState({})
  const [isRequestMade, setIsRequestMade] = useState(false);
  const [fieldName, setFieldName] = useState('')
  const [fieldType, setFieldType] = useState('');
  const [fieldComposite, setFieldComposite] = useState('')
  const id = localStorage.getItem('user_id')
  const [isLoading, setLoadingActive] = useState(false)


  useEffect(() => {
    const getParams = () => {
      const formdata = new FormData();
      formdata.append('id', id)
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
        if(response.data.status == 'success'){
          console.log(response.data.data)
          setParams(response.data.data.params)
          setComposite(response.data.data.composite_settings)
          console.log(composite)
        }else{
          console.log(response.data)
        }
        setIsRequestMade(true)
      })
    }

    if(!isRequestMade){
      getParams();
    }

  })

  const sendNewParameter = () => {
    setLoadingActive(true)

    const document = {
      'id' : id,
      'new_operators_inputs' : params,
      'composite_settings' : composite,
    }

    document['new_operators_inputs'][fieldName] = fieldType
    document['composite_settings'][fieldName] = fieldComposite

    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/edit_operators_inputs/', document).then((response) => {
      if(response.data.status == 'success'){
        const formdata = new FormData()
        formdata.append('id', id)
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
          if(response.data.status == 'success'){
            setParams(response.data.data.params)
            setComposite(response.data.data.composite_settings)
          }
        })
      }
    })
    setLoadingActive(false)
  }

  const deleteParam = (key) => {
    console.log(key)
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('input_name', key)
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/delete_operator_input/', formdata).then((response) => {
      if(response.data.status == 'success'){
        const formdata = new FormData()
        formdata.append('id', id)
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
          if(response.data.status == 'success'){
            setParams(response.data.data.params)
            setComposite(response.data.data.composite_settings)
          }
        })
      }
    })
  }


  const [runTutorial, setRunTutorial] = useState(false)

  const startTutorial = () => {
    setRunTutorial(true);
  }

  const steps = [
    {
      target: ".name-params-container",
      content: "Inserisci il nome del tuo nuovo parametro da voler tenere d'occhio!",
      placement: "left",
    },
    {
      target: ".type-params-container",
      content: "Inserisci il tipo di dato che ne risulta",
      placement: "left",
    },
    {
      target: ".formula-params-container",
      content: "Scegli tra i parametri esistenti e metti insieme le operazioni per arrivare al tuo obiettivo!",
      placement: "left",
    },
    {
      target: ".add-params-button",
      content: "Non ti resta che aggiungere il tuo nuovo controllo, ora non perdere di vista nulla!",
      placement: "left",
    },
    {
      target: ".sett-container",
      content: "Questo è il risultato ottenuto, controlla che sia tutto corretto!",
      placement: "left",
    },
    {
      target: ".delete-button",
      content: "In caso trovi un errore, potrai eliminare il controllo cliccando qui e crearne uno nuovo!",
      placement: "left",
    },
  ];  

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === 'finished' || status === 'skipped') {
      setRunTutorial(false);
    }
  };

  return (
    <div className='settings-root-container'>
      {isLoading === true && (
          <div className='overlay'>
              <div className='spinner'>
              <ColorRing
                  colors={['white', 'white', 'white', 'white', 'white']}
                  />
              </div>
          </div>
      )}
      <Joyride 
        steps={steps}
        run={runTutorial}
        continuous={true}
        styles={{
          options: {
            primaryColor: '#4075FF'
          }
        }}
        locale={{
          back: 'Indietro',
          next: 'Avanti',
          last: 'Fine',
          close: 'Chiudi',
        }}
        callback={handleJoyrideCallback}
      />
      <div className='settings-navbar-container'>
        <DashboardNavbar/>
      </div>
      <div className='settings-display-container'>
        <div className='personalized-title-container'>
          <p className='personalized-title'>Crea e aggiungi le formule per controllare<br></br> i tuoi Dipendenti come vuoi tu! <span className='scopri-come' onClick={() => startTutorial()}>Scopri come!</span></p>
        </div>
        <div className='personal-settings-container'>
          <div className='params-container'>
            <div className='name-params-container'>
              <input className='content-params' placeholder='Nome formula...' type='text' onChange={(e) => setFieldName(e.target.value)}/>
            </div>
            <div className='type-params-container'>
              <select className='content-params-t' onChange={(e) => setFieldType(e.target.value)}>
                <option value="">Tipo...</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="operator">Operatori</option>
                <option value="composite">Composite</option>
              </select>
            </div>
            <div className='formula-params-container'>
              <input className='content-params' placeholder='A*B/C...' type='text' onChange={(e) => setFieldComposite(e.target.value)}/>
            </div>
            <div className='add-params-container'>
              <div className='add-params-button' onClick={sendNewParameter}>
                <p className='add-params'>Aggiungi</p>
              </div>
            </div>
          </div>
        </div>
        <div className='my-settings-display'>
          <div className='my-settings-container'>
          {
              Object.entries(params).map(([key, value]) => {
                if(value != "composite"){
                  return(
                    <div className='sett-container'>
                      <div className='name-sett-container'>
                        <p className='sett'>{key}</p>
                      </div>
                      <div className='type-sett-container'>
                        <div className='sett'>{value}</div>
                      </div>
                      <div className='formula-sett-container'>
                        <p className='sett'>-</p>
                      </div>
                      <div className='delete-container'>
                        <div className='delete-button'  onClick={() => deleteParam(key)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return(
                  <div className='sett-container'>
                    <div className='name-sett-container'>
                      <p className='sett'>{key}</p>
                    </div>
                    <div className='type-sett-container'>
                      <div className='sett'>{value}</div>
                    </div>
                    <div className='formula-sett-container'>
                      <p className='sett'>{composite[key]}</p>
                    </div>
                    <div className='delete-container'>
                      <div className='delete-button' onClick={() => deleteParam(key)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
                  </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsDipendenti