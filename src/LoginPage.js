import * as React from 'react';
import { Alert, Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Close, CodeOutlined, Email, Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { Buffer } from 'buffer'

const keyStorage = 'ingatkan'

export default function LoginPage() {
  const [nilai, setNilai] = React.useState({ email: '', password: '', ingatkan: false, viewPassword: false })
  const [pesanError, setAlert] = React.useState('')
  const emailInput = React.useRef(null)
  const passwordInput = React.useRef(null)

  const updateNilai = e => setNilai({ ...nilai, [e.target.name]: e.target.value })

  const hapusNilai = n => {
    setNilai({ ...nilai, [n]: '' })
    switch (n) {
      case 'email':
        emailInput.current.focus()
        break;
      default:
        passwordInput.current.focus()
        break;
    }
  }

  const ingatkan = e => setNilai({ ...nilai, ingatkan: e.target.checked })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get('email'), password: data.get('password') });
    console.log(JSON.stringify({ nilai }))
    if (nilai.ingatkan) localStorage.setItem(keyStorage, new Buffer.from(JSON.stringify(nilai), 'utf-8').toString('base64'))
    else localStorage.removeItem(keyStorage)
    if (data.get('email') === 'salah@salah.com') setAlert('Akun tidak valid, silakan ulangi lagi')
  };

  React.useEffect(() => {
    async function removeAlert() {
      await new Promise(r => setTimeout(r, 3000))
      setAlert('')
    }
    if (pesanError.trim().length > 0) removeAlert()
  }, [pesanError])

  React.useEffect(() => {
    const lastNilai = localStorage.getItem(keyStorage)
    if (typeof lastNilai === 'string') {
      const jsonNilai = new Buffer.from(JSON.stringify(lastNilai), 'base64').toString('utf-8')
      setNilai(JSON.parse(jsonNilai))
    }
  }, [])

  const errorEmail = nilai.email.length > 3 && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(nilai.email))

  const disableSubmit = errorEmail || nilai.password.length < 5 || nilai.email.length < 5

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      {pesanError.trim().length > 0 && <Alert severity='error' sx={{ position: 'absolute', right: 16, top: 16 }}>{pesanError}</Alert>}
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
            <TextField inputRef={emailInput} error={errorEmail} label='Email' variant='standard' fullWidth helperText={errorEmail ? 'Format Email belum valid' : ''} onChange={updateNilai} InputProps={{ endAdornment: <InputAdornment position='end'>{nilai.email.length > 3 && <IconButton sx={{ mr: 1 }} onClick={() => hapusNilai('email')}><Close /></IconButton>}       <Email /></InputAdornment> }} type='email' name='email' value={nilai.email} />

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
    </Grid>
  );
}
