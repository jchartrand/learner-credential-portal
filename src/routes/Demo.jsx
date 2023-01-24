import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Demo() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
          <Typography component="h1" variant="h5">
           Choose a demo user.  
           </Typography>
           <br/>
           <Typography component="h4" variant="h7">You'll be shown available credentials for that user.  This scenario assumes we've already logged into campus auth.  It demonstrates the case where an issuer doesn't want to use eduRoam auth, but rather handle authentication themselves.
          </Typography>
          <Box sx={{ mt: 1 }}>
          <Button
              onClick={ () => { window.location.href = 'http://localhost:4000/demo/ian' } }
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ian Malcom - various demo credentials
            </Button>
            <Button
              onClick={ () => { window.location.href = 'http://localhost:4000/demo/ada' } }
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ada Lovelace - Computer Progammer
            </Button>
            <Button
              onClick={ () => { window.location.href = 'http://localhost:4000/demo/sommerville' } }
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Mary Sommerville - Scientist
            </Button>
        
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}