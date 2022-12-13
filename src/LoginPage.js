import * as React from 'react';
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Close, CodeOutlined, Key, Person2Outlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Buffer } from 'buffer'
import AlertComponent from './components/alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, setAlert } from './services/store';
import { useNavigate } from 'react-router-dom';
import { ApiPost } from './services/api';
import { path } from './services/constants';

const keyStorage = 'ingatkan'

export default function LoginPage() {
  const [nilai, setNilai] = React.useState({ idpengguna: '', password: '', ingatkan: false, viewPassword: false })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const idpenggunaInput = React.useRef(null)
  const passwordInput = React.useRef(null)
  const loginState = useSelector((state) => state.login)
  const activePage = useSelector((state) => state.activePage)

  const updateNilai = e => setNilai({ ...nilai, [e.target.name]: e.target.value })

  React.useEffect(() => {
    if (typeof loginState.idpengguna === 'string') {
      navigate(activePage)
    }
  }, [navigate, loginState, activePage])

  const hapusNilai = n => {
    setNilai({ ...nilai, [n]: '' })
    switch (n) {
      case 'idpengguna':
        idpenggunaInput.current.focus()
        break;
      default:
        passwordInput.current.focus()
        break;
    }
  }

  const ingatkan = e => setNilai({ ...nilai, ingatkan: e.target.checked })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    console.log({ idpengguna: dataForm.get('idpengguna'), password: dataForm.get('password') });
    console.log(JSON.stringify({ nilai }))
    if (nilai.ingatkan) localStorage.setItem(keyStorage, new Buffer.from(JSON.stringify(nilai), 'utf-8').toString('base64'))
    else localStorage.removeItem(keyStorage)

    const data = JSON.stringify({
      idpengguna: dataForm.get('idpengguna'),
      password: dataForm.get('password'),
    })
    let dataRespon = { ok: false, message: 'Tidak dapat mengakses server' }
    try {
      const respon = await ApiPost(path.login, data, {})
      dataRespon = respon.data
    } catch (error) {
      if (error.response) {
        dataRespon = error.response.data
      }
    }
    if (dataRespon.ok && typeof dataRespon.data === 'string') {
      console.log(dataRespon.data)
      dispatch(login(dataRespon.data))
    } else {
      dispatch(setAlert({ variant: 'error', label: dataRespon.message }))
    }
  };

  React.useEffect(() => {
    const lastNilai = localStorage.getItem(keyStorage)
    if (typeof lastNilai === 'string') {
      const jsonNilai = new Buffer.from(JSON.stringify(lastNilai), 'base64').toString('utf-8')
      setNilai(JSON.parse(jsonNilai))
    }
  }, [])

  const errorIdPengguna = nilai.idpengguna.length < 3

  const disableSubmit = errorIdPengguna || nilai.password.length < 5 || nilai.idpengguna.length < 5

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} lg={8} sx={{ backgroundImage: 'url(https://img.jocodev.id/bwbg.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <Grid item xs={12} sm={8} md={6} lg={4} square sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ mx: 4, maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Box sx={{ mb: 6, display: 'flex', flexDirection: 'row' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mt: 2, mr: 2 }}>
              <CodeOutlined />
            </Avatar>
            <Typography component="span" variant="h2" color='primary' fontWeight='bold'>
              Joco
            </Typography>
            <Typography component="span" variant="h2" color='secondary' fontWeight='bold'>
              Dev
            </Typography>
          </Box>
          <Typography component="h1" variant="h5" fontWeight='bold'>
            MASUK
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField inputRef={idpenggunaInput} error={errorIdPengguna} label='ID Pengguna' variant='standard' fullWidth helperText={errorIdPengguna ? 'ID Pengguna belum valid' : ''} onChange={updateNilai} InputProps={{ endAdornment: <InputAdornment position='end'>{nilai.idpengguna.length > 3 && <IconButton sx={{ mr: 1 }} onClick={() => hapusNilai('idpengguna')}><Close /></IconButton>}       <Person2Outlined /></InputAdornment> }} type='text' name='idpengguna' value={nilai.idpengguna} />

            <TextField inputRef={passwordInput} label='Password' variant='standard' fullWidth sx={{ my: 2 }} onChange={updateNilai} InputProps={{ endAdornment: <InputAdornment position='end'  >     {nilai.password.length > 3 && <IconButton onClick={() => hapusNilai('password')}>     <Close />   </IconButton>}   <IconButton onClick={() => setNilai({ ...nilai, viewPassword: !nilai.viewPassword })}>     {!nilai.viewPassword && <VisibilityOff />}    {nilai.viewPassword && <Visibility />}   </IconButton>   <Key /></InputAdornment> }} type={nilai.viewPassword ? 'text' : 'password'} name='password' value={nilai.password} />

            <FormControlLabel control={<Checkbox value="remember" onChange={ingatkan} checked={nilai.ingatkan} color="primary" />} label="Ingatkan Saya" />
            <Button disabled={disableSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: 20 }}  >Masuk</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Lupa Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Belum punya akun? Registrasi"}
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 5 }} color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://jocodev.id/">
                jocodev.id
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <AlertComponent />
    </Grid>
  );
}
