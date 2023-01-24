import { Outlet, Link } from "react-router-dom";
import logo from '../images/DCC_navbar-logo.png';
import './Root.css';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        MIT Open Learning
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'DCC',
    description: ['About', 'Contact us'],
  },
  {
    title: 'Help',
    description: [
      'Wallets',
      'Verifiable Credentials',
      'Decentralized Identifiers',
      'FAQ',
    ],
  },

  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function Header() {
  return ( <AppBar
  position="static"
  color="default"
  elevation={0}
  sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
>
  <Toolbar sx={{ flexWrap: 'wrap' }}>
  <Link to="/learner-credential-portal"><img src={logo} className="App-logo" alt="logo" sx={{ marginTop: '20px'}}  /></Link>
    <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
    Learner Credential Portal
    </Typography>
   
      
      <Button
       
        sx={{ my: 1, mx: 1.5 }}
      >
        Help
      </Button>
      
   
  
  </Toolbar>
</AppBar>)
}
export default function Root() {
  return (
    <div className="App">
      <Header/>
        
      
      <Outlet />
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </div>
  );
}

