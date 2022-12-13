import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../services/store';

export default function AlertComponent() {
  const alertState = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    dispatch(setAlert({ ...alertState, label: '' }))
  }

  return (
    <Snackbar open={alertState.label !== ''} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{alertState.label}</Alert>
    </Snackbar>
  )
}