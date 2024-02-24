import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; // Directly import Paper from '@mui/material'
import './dipendentiTable.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColorRing } from 'react-loader-spinner';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4075FF',
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function DipendentiTable({ currentOperators, onDelete }) {

  const [dipendenti, setDipendenti] = useState({})
  const [headersDipendenti, setHeadersDipendenti] = useState({})
  const [isRequestMadeOperators, setIsRequestMadeOperators] = useState(false)
  const [editingMode, setEditingMode] = useState(false)
  const [EditedEarning, setEditedEarning] = useState({})
  const [isLoading, setLoadingActive] = useState(false)


  useEffect(() => {

    const getData = () => {
      const formdata = new FormData();
      formdata.append('id', localStorage.getItem('user_id'))
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators/', formdata).then((response) => {
        if(response.data.status == 'success'){
          setDipendenti(response.data.data.operators)
  
        }
      })
    }
  
    const getInputs = () => {
      const formdata = new FormData();
      formdata.append('id', localStorage.getItem('user_id'))
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_operators_inputs/', formdata).then((response) => {
        if(response.data.status == 'success'){
          setHeadersDipendenti(response.data.data);
        }
      })
  
    }
  

    if(!isRequestMadeOperators){
      getData()
      getInputs()
      setIsRequestMadeOperators(true)
    }

  })

    const deleteOperator = (value) => {
      setLoadingActive(true)
      const request = {
        'id' : localStorage.getItem('user_id'),
        'operator' : value
      }
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/delete_operator/', request).then((response) => {
        if(response.data.status == "success"){
          currentOperators = response.data.data
          onDelete();
          setLoadingActive(false)
        }
      })
    }


    return(
      <TableContainer component={Paper}>
        {isLoading === true && (
              <div className='overlay'>
                  <div className='spinner'>
                  <ColorRing
                      colors={['white', 'white', 'white', 'white', 'white']}
                      />
                  </div>
              </div>
          )}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                headersDipendenti.params != undefined && headersDipendenti.params!= null ? 
                  Object.entries(headersDipendenti.params).map(([key, value]) => {
                  return(
                    <StyledTableCell align='center'>{key}</StyledTableCell>
                  )
                })
                : console.log('aspettando gli header...')
              }
              <StyledTableCell align='center'>Elimina</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { currentOperators != undefined && currentOperators != null ?
            Object.entries(currentOperators).map(([key, value]) => {
              return(
              <StyledTableRow defaultValue={"-"}>
              {
                headersDipendenti.params != undefined && headersDipendenti.params!= null ? 
                Object.entries(headersDipendenti.params).map(([param, type]) => {
                  if(value[param] != undefined){
                    return(
                      <StyledTableCell align='center'>{value[param]}</StyledTableCell>
                    )
                  }else{
                    return(
                      <StyledTableCell align="center">-</StyledTableCell>
                    )
                  }
                })
                : <div/>
                  
              }
              <StyledTableCell align='center'><FontAwesomeIcon icon={faTrash} className='delete-row' onClick={() => deleteOperator(value)}/></StyledTableCell>
              </StyledTableRow>
              )
            })
            : console.log("aspettando i dati...")
          }
          </TableBody>
        </Table>
      </TableContainer>
    )
  } export default DipendentiTable