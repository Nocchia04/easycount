import React, { useEffect } from 'react'
import { useRef } from 'react'
import './dashboard.css'
import DashboardNavbar from './dashboard-navbar/dashboardnavbar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, CartesianGrid, Line } from 'recharts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import DashboardTable from './IncassiTable/dashboardTable';
import DipendentiTable from './DipendentiTable/dipendentiTable';

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;


  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;

}

function Dashboard() {

  const [choose, setChoose] = useState("generale")
  const [dipendenti, setDipendenti] = useState("false")
  const [incassi, setIncassi] = useState("visualizza")
  const [menu, setMenu] = useState("false")
  const [inputs, setInputs] = useState({})
  const [inputsDipendenti, setInputsDipendenti] = useState({})
  const [earning, setEarning] = useState({
    'id' : localStorage.getItem('user_id'),
    'date' : getCurrentDate(),
    'inputs' : {}
  })

  const [isRequestMade, setIsRequestMade] = useState(false)
  const [currentEarnings, setCurrentEarnings] = useState({})
  const [currentOperators, setCurrentOperators] = useState({})

  const [totalIncome, setTotalIncome] = useState(0)
  const [weeklyGraph, setWeeklyGraph] = useState({})
  const [monthlyGraph, setMonthlyGraph] = useState({})
  

  const [operator, setOperator] = useState({
    'id' : localStorage.getItem('user_id'),
    'date' : getCurrentDate(),
    'inputs' : {}
  })

  const showInputs = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'))
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_inputs/', formdata).then((response) => {
      if(response.data.status == 'success'){
        setInputs(response.data.data);
        console.log(inputs)
        setMenu("true")
      }
    })

  }

  const showInputsDipdendenti = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'))
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
      if(response.data.status == 'success'){
        setInputsDipendenti(response.data.data);
        console.log(inputs)
        setDipendenti("true")
      }
    })
  }

  const addEarning = (key, value) => {
    let temp = earning
    temp['inputs'][key] = value
    setEarning(temp)
  }

  const addOperator = (key, value) => {
    let temp = operator
    temp['inputs'][key] = value
    setOperator(temp)
  }
  
  const uploadEarning = () => {
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/new_earning/', earning).then((response) => {
      if(response.data.status == 'success') {
        getEarnings();
        setMenu("false")
      }
    } )
  }

  const uploadNewOperator = () => {
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/new_operator/', operator).then((response) => {
      if(response.data.status == 'success') {
        getOperators();
        setDipendenti("false")
      }
    } )
  }

  const getEarnings = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'))
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_earnings/', formdata).then((response) => {
      if(response.data.status == 'success'){
        setCurrentEarnings(response.data.data.earnings)

      }
    })
  }

  const getOperators = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'))
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators/', formdata).then((response) => {
      if(response.data.status == 'success'){
        setCurrentOperators(response.data.data.operators)
      }
    })
  }

  const getTotalEarnings = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'))
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/total_earnings/', formdata).then((response) => {
      if(response.data.status == 'success'){
        setTotalIncome(response.data.total)
      }
    })
  }

  const getWeeklyEarnings = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'));
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/week_graph_earnings/', formdata).then((response) => {
      if(response.data.status == "success"){
        setWeeklyGraph(response.data.data)
        console.log(response.data.data)
      }
  
    })
  }

  const getMonthlyGraph = () => {
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('user_id'));
    axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/monthly_graph_earnings/', formdata).then((response) => {
      if(response.data.status == "success"){
        setMonthlyGraph(response.data.data)
        console.log(response.data.data)
      }
    })
  }

  useEffect(() => {
    if(!isRequestMade){
      getTotalEarnings();
      getEarnings();
      getOperators();
      getWeeklyEarnings();
      getMonthlyGraph();
      setIsRequestMade(true);
    }
  })
  

  const data = [
    { name: 'Lunedì', euro: 300 },
    { name: 'Martedì', euro: 450 },
    { name: 'Mercoledì', euro: 600 },
    { name: 'Giovedì', euro: 150 },
    { name: 'Vederdì', euro: 200 },
    { name: 'Sabato', euro: 550 },
    { name: 'Domenica', euro: 350}
  ];

  return (
    <div className='dashboard-container'>
      <div className='db-c'>
        <DashboardNavbar/>
      </div>
      
      <div className='content-section'>
        <div className='left-navigation-bar-container'>
          <div className='all-left-navigation'>
            <div className={choose==="generale" ? 'left-section selected' : 'left-section'} onClick={() => setChoose('generale')}>
              <p className='left-section-text'>Generale</p>
            </div>
            <div className={choose==="incassi" ? 'left-section selected' : 'left-section'} onClick={() => setChoose('incassi')}>
              <p className='left-section-text'>Incassi</p>
            </div>
            <div className={choose==="dipendenti" ? 'left-section selected' : 'left-section'} onClick={() => setChoose('dipendenti')}>
              <p className='left-section-text'>Dipendenti</p>
            </div>
          </div>
          <div className='settings-container'>
            <Link to={"/settings"}><FontAwesomeIcon className='sliders-icon' icon={faSliders} /></Link>         
          </div>
        </div>

        <div className={choose==="generale" ? 'contenuto-generale-container' : 'contenuto-generale-container hidden'}>
          <div className='total-income-container'><h3>Incassi totali: </h3><p>€{totalIncome}</p></div>
          <div className='graph-income-section-container'>
          <div className='left-graph-container'>
                          <div className='graph-title-container'>
                            <p className='graph-title'>Andamento annuale</p>
                          </div>
                          <div className='graph-component-container'>
                          <ResponsiveContainer  width="90%" aspect={4.0/3.0}>
                          <LineChart data={monthlyGraph} >
                            <XAxis dataKey="Mese" />
                            <YAxis/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="euro" stroke="#4075FF" />
                          </LineChart>
                          </ResponsiveContainer>
                          </div>
          </div>
          <div className='right-graph-container'>
                      <div className='graph-generale-container' onClick={() => setChoose('incassi')}>
                          <div className='graph-title-container'>
                            <p className='graph-title'>Non male per questa settimana!</p>
                          </div>
                          <div className='graph-component-container'>
                            <ResponsiveContainer width="90%" aspect={4.0/3.0}>
                              <BarChart data={weeklyGraph}>
                                <XAxis dataKey="Giorno" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="euro" fill="#4075FF"/>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                    </div>
                  </div>
        </div>

        <div className={choose==="incassi" ? 'contenuto-incassi-container' : 'contenuto-incassi-container hidden'}>
          <div className='incassi-navbar-container'>
            <div className='aggiungi-button-container' onClick={showInputs}>
              <p className='aggiungi-title'>Aggiungi Incasso</p>
              <FontAwesomeIcon icon={faPlus} className='plus'/>
            </div>
          </div>
          
          <div className={incassi==="visualizza" ? 'visualizza-container view' : 'visualizza-container'}>
            <div className='table-visualizza' style={{opacity: menu === 'true' ? '0.5' : '1'}}>
                <DashboardTable currentEarnings={currentEarnings} onDelete={getEarnings} />
            </div>
            <div className={menu==='true' ? 'aggiungi-incassi-container view' : 'aggiungi-incassi-container'}>
              <div className='menu-container'>
                <div className='back'>
                  <div className='aggiungi-incassi-title'>
                    <p className='agg-title'>Aggiungi un incasso</p>
                  </div>
                  <FontAwesomeIcon className='back-arrow' icon={faArrowRight} onClick={() => setMenu('false')}/>
                </div>
                <div className='add-container'>
                  <div className='add-form-container'>
                    {
                      inputs.params != null && inputs.params != undefined ?
                        Object.entries(inputs?.params)?.map(([key, value]) => {
                          if(value != "composite"){
                            return(
                            <div className='three-input'>
                              <input className='add-form-input' placeholder={key} type={value} onChange={(e) => addEarning(key, e.target.value)}/>
                            </div>
                            )
                          }
                        })
                      : console.log("waiting for data...")
                    }
                    <div className='divisor-button'>
                      <div className='add-button' onClick={uploadEarning}>
                        <p className='add-button-title'>Aggiungi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>

        <div className={choose==="dipendenti" ? 'contenuto-dipendenti-container' : 'contenuto-dipendenti-container hidden'}>
          <div className='dipendente-container'>
            <div className='dipendente-button-container' onClick={showInputsDipdendenti}>
              <p className='dipendente-title'>Aggiungi Dipendente</p>
              <FontAwesomeIcon icon={faPlus} className='plus'/>
            </div>
          </div>

          <div className='visualizza-dipendenti-container'>
            <div className='dipendenti-table-container' style={{opacity: dipendenti === 'true' ? '0.5' : '1'}}>
              <DipendentiTable currentOperators={currentOperators} onDelete={getOperators}/>
            </div>
            
            <div className={dipendenti==='true' ? 'aggiungi-dipendenti-container view' : 'aggiungi-dipendenti-container'}>
              <div className='back'>
                  <div className='aggiungi-incassi-title'>
                    <p className='agg-title'>Aggiungi un dipendente</p>
                  </div>
                  <FontAwesomeIcon className='back-arrow' icon={faArrowRight} onClick={() => setDipendenti('false')}/>
              </div>
              <div className='add-dip-container'>
              <div className='add-form-container'>
                    {
                      inputsDipendenti.params != null && inputsDipendenti.params != undefined ?
                        Object.entries(inputsDipendenti?.params)?.map(([key, value]) => {
                          if(value != "composite"){
                            return(
                            <div className='three-input'>
                              <input className='add-form-input' placeholder={key} type={value} onChange={(e) => addOperator(key, e.target.value)}/>
                            </div>
                            )
                          }
                        })
                      : console.log("waiting for data...")
                    }
                    <div className='divisor-button'>
                      <div className='add-button' onClick={uploadNewOperator}>
                        <p className='add-button-title'>Aggiungi</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
