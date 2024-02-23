import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; // Directly import Paper from '@mui/material'
import './dashboardTable.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


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

function createData(Giorno, POS1, POS2, Contanti, Totale, Scarto, SpeseExtra, TotaleEffettivo, NumeroCoperti, ScontrinoMedio) {
  return { Giorno, POS1, POS2, Contanti, Totale, Scarto, SpeseExtra, TotaleEffettivo, NumeroCoperti, ScontrinoMedio };
}

const rows = [
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),
  createData('26/01/05', 74, 46, 159, 179, 5, 20, 159, 84, 23),

];

export default function DashboardTable({ currentEarnings, onDelete }) {

  const [earnings, setEarnings] = useState({})
  const [headers, setHeaders] = useState({})
  const [isRequestMadeEarnings, setIsRequestMadeEarnings] = useState(false)
  const [editingMode, setEditingMode] = useState(false)
  const [oldEarnings, setOldEarnigns] = useState(earnings)
  const [EditedEarning, setEditedEarning] = useState({})





  useEffect(() => {

    const getData = () => {
      const formdata = new FormData();
      formdata.append('id', localStorage.getItem('user_id'))
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_earnings/', formdata).then((response) => {
        if(response.data.status == 'success'){
          setEarnings(response.data.data.earnings)
  
        }
      })
    }
  
    const getInputs = () => {
      const formdata = new FormData();
      formdata.append('id', localStorage.getItem('user_id'))
      axios.post('https://easycount-8a1d6b5ada49.herokuapp.com/inputs/get_inputs/', formdata).then((response) => {
        if(response.data.status == 'success'){
          setHeaders(response.data.data);
        }
      })
  
    }

    if(!isRequestMadeEarnings){
      getData()
      getInputs()
      setIsRequestMadeEarnings(true)
    }

  })

  useEffect(() => {
    console.log("EARNING CORRENTE", currentEarnings)
  }) 


  const deleteEarning = (value) => {
    const request = {
      'id' : localStorage.getItem('user_id'),
      'earning' : value
    }
    axios.post('https://easycount-8a1d6b5ada49.herokuapp./inputs/delete_earning/', request).then((response) => {
      if(response.data.status == "success"){
        currentEarnings = response.data.data
        onDelete();
      }
    })
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Date</StyledTableCell>
            {
              headers.params != undefined && headers.params!= null ? 
                Object.entries(headers.params).map(([key, value]) => {
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
          { currentEarnings != undefined && currentEarnings != null ?
            Object.entries(currentEarnings).map(([key, value]) => {
              return(
              <StyledTableRow defaultValue={"-"}>
              {
                Object.entries(value).map(([index, number ]) => {
                    return(
                      <StyledTableCell align='center'>{editingMode ? <input type="text" className='edit-input-form' placeholder={index} /> : <p>{number}</p> }</StyledTableCell>
                    )
                })
              }
              <StyledTableCell align='center'><FontAwesomeIcon icon={faTrash} className='delete-row' onClick={() =>deleteEarning(value)}/></StyledTableCell>
              </StyledTableRow>
              )
            })
            : console.log("aspettando i dati...")
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}