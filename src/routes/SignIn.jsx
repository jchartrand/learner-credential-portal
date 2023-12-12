import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useNavigate} from 'react-router-dom';
import Help from '../components/Help'
import WideToolTip from '../components/WideToolTip';

const submitText = <React.Fragment>
<Typography color="inherit">When you click this...</Typography>
{`It will authenticate the student using eduGain then call an issuer-hosted deployment of the LearnerCredentialIssuer (LCI) to get a list of credentials for the authenticated student.`}
</React.Fragment>
const theme = createTheme();

const testText = <React.Fragment>
            <Typography color="inherit">Authentication...</Typography>
            <p>{"Ideally this web page is hosted centrally and would use eduGain for authentication"}</p>
            <p>{"It could, however, be run locally by an individual issuer and use local campus auth."}</p>
            <p>{"Alternatively, authentication could happen elsewhere, say on a campus page, and after authentication, redirect to this page, passing along the URI for an LCI from which to get the list of available credentials for the student."}</p>
          </React.Fragment>

export default function SignIn() {
  //const history = useHistory();
 

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    navigate('/credentials', { state: loginData });
    
   // could later have this make a fetch call, setting an Authorization bearer token
   // maybe from eduGain, then redirecting to the returned url.
   // window.open(`https://lci.onrender.com/demo/${data.get('password')}`)
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to see your available credentials.
            <Help title={testText}/>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="eduroam userId"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           <WideToolTip title={submitText}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In 
            </Button>
            </WideToolTip>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}