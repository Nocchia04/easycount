import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, CartesianGrid, Line } from 'recharts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import DashboardTable from '../IncassiTable/dashboardTable';
import DipendentiTable from '../DipendentiTable/dipendentiTable';
import "./dashboard-mobile.css"

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

const DashboardMobile = ({ chooseMobile }) => {
    const [isLoading, setLoadingActive] = useState(false)
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

    const [selectedParamGraph, setSelectedParamGraph] = useState("undefined")
    const [graphParams, setGraphParams] = useState({})

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
            setMenu("true")
        }
        })

    }

    const getGraphInputs = () => {
        const formdata = new FormData();
        formdata.append('id', localStorage.getItem('user_id'))
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_inputs/', formdata).then((response) => {
        if(response.data.status == 'success'){
            setGraphParams(response.data.data);
        }
        })
    }

    const showInputsDipdendenti = () => {
        const formdata = new FormData();
        formdata.append('id', localStorage.getItem('user_id'))
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
        if(response.data.status == 'success'){
            setInputsDipendenti(response.data.data);
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
        setLoadingActive(true);
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/new_earning/', earning).then((response) => {
        if(response.data.status == 'success') {
            getEarnings();
            setLoadingActive(false);
            setMenu("false")
        }
        } )
    }

    const uploadNewOperator = () => {
        setLoadingActive(true);
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/new_operator/', operator).then((response) => {
        if(response.data.status == 'success') {
            getOperators();
            setLoadingActive(false);
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
        formdata.append('param', selectedParamGraph)
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/total_earnings/', formdata).then((response) => {
        if(response.data.status == 'success'){
            setTotalIncome(response.data.total)
        }
        })
    }

    const getWeeklyEarnings = () => {
        setLoadingActive(true)
        const formdata = new FormData();
        formdata.append('id', localStorage.getItem('user_id'));
        formdata.append('param', selectedParamGraph)
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/week_graph_earnings/', formdata).then((response) => {
        if(response.data.status == "success"){
            setWeeklyGraph(response.data.data)
        }
        })
        setLoadingActive(false)
    }

    const getMonthlyGraph = () => {
        const formdata = new FormData();
        formdata.append('param', selectedParamGraph)
        formdata.append('id', localStorage.getItem('user_id'));
        axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/auth/monthly_graph_earnings/', formdata).then((response) => {
        if(response.data.status == "success"){
            setMonthlyGraph(response.data.data)
        }
        })
    }

    useEffect(() => {
        getWeeklyEarnings();
        getMonthlyGraph();
        getTotalEarnings();
    }, [selectedParamGraph])


    useEffect(() => {
        if(!isRequestMade){
        setLoadingActive(true)
        getGraphInputs();
        getTotalEarnings();
        getEarnings();
        getOperators();
        getWeeklyEarnings();
        getMonthlyGraph();
        setIsRequestMade(true);
        setLoadingActive(false)
        }
    })

  return (
    <div>
        <div className={chooseMobile == "generale" ? "dashboard-mobile-container" : "dashboard-mobile-container hidden"}>
            <div className='total-income-container-mobile'>
                <select onChange={(e) => setSelectedParamGraph(e.target.value)} className='content-params-t-dashboard'>
                    <option value="undefined">Tipo...</option>
                    { 
                    graphParams.params != null && graphParams.params != undefined ?
                        Object.entries(graphParams?.params)?.map(([key, value]) => {
                            return(
                            <option className='add-form-input-mobile' value={key}>{key}</option>
                            )
                        })
                    : <div/>
                    }
                </select>
                <div className='total-income-text-container'>
                <h3>Totale di "{selectedParamGraph}": </h3>
                <p>€{totalIncome}</p>
                </div>
            </div>
            <div className='mobile-graph-section-container'>
                  <div className='right-graph-container'>
                      <div className='graph-title-container'>
                        <p className='graph-title'>Andamento settimanale</p>
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
            </div>

        </div>


        <div className={chooseMobile == "incassi" ? "incassi-mobile-container" : "incassi-mobile-container hidden"}>
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
            <div className={menu==='true' ? 'aggiungi-incassi-container-mobile view' : 'aggiungi-incassi-container-mobile'}>
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
                      : <div/>
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


        <div className={chooseMobile == "dipendenti" ? "dipendenti-mobile-container": "dipendenti-mobile-container hidden"}>
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
            
            <div className={dipendenti==='true' ? 'aggiungi-dipendenti-container-mobile view' : 'aggiungi-dipendenti-container-mobile'}>
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
                      : <div/>
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
  )
}

export default DashboardMobile
