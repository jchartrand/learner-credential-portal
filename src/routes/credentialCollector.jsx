import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Help from '../components/Help'
import Tooltip from '@mui/material/Tooltip';
import {useLocation} from 'react-router-dom'

const walletHelp = "The 'add to DCC wallet' choice is a deep link that opens the LCW, passing in the challenge and LCI endpoint to which to post the DIDAuth and get the cred.  The 'Add to Other wallet' option would invoke other options like chapi."
const LCWHelp = "Clicking this triggers the deep link to open the LCW, passing in the LCI collection endpoint and challenge.  The wallet then calls the endpoint, passing a DIDAuth, getting the credential in return."
const ChapiHelp = "Triggers a CHAPI GET.  Wallet either a) returns DIDAuth and the LCP then calls the collection enpoint to get credential and then calls chapi 'store' to add it to the wallet OR b) wallet directly calls the LCI endpoint passing DIDAuth to get back credential."
const pdfButtonHelp = "A PDF (with QR) version of this credential is available.  Click to download."

function getDeepLink(cred) {
  //)
 // const deepLink = `dccrequest://request?issuer=me&vc_request_url=${cred.collectionEndpoint}&challenge=${cred.challenge}&auth_type=bearer`
  console.log('the cred deep link: ')
  console.log(cred.deepLink)
  return () => { window.location.href = cred.deepLink } 
 }



function CredList() {
  const [list, setList] = useState(null)
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams (location. search) ;
    const listURI = queryParams.get ('list') ;
    if (listURI) {
      fetch(listURI)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setList(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
    } else {
      setIsLoaded(true)
      setError({message:'You seem to have arrived at this page directly, but should have first logged in or been redirected from your institution.'})
    }
  }, []);

  return (
   
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
    
      { error && <div>Error: {error.message} </div> }

      { (!isLoaded) && <div>Loading...</div> }
   
      {isLoaded && 
    <>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Credentials {list[0].holderName ? <span> for {list[0].holderName} </span>: ''}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Add a copy of your credential to the DCC LCW wallet, or choose another wallet. <br/>
          
        </Typography>
      </Container>
      

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {list.map((cred) => (
            <Grid
              item
              key={cred.id}
              xs={12}
              sm={cred.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={cred.displayTitle}
                  subheader={cred.displaySubtitle}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                 
                  <ul>
                    
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        {cred.issuerName}
                      </Typography>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        {cred.grantedDate}
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                <Tooltip title={LCWHelp}>
                  <Button fullWidth variant='outlined' onClick={getDeepLink(cred)}>
                  <Typography
                        align="center"
                        color="black"
                        fontSize=".7em"
                      >
                        Add to LCW
                      </Typography>
                  </Button>
                  </Tooltip>
                  <Tooltip title={ChapiHelp}>
                 <Button fullWidth variant='outlined'>
                 <Typography
                        
                        align="center"
                        color="black"
                        fontSize=".7em"
                      >
                        Other wallet
                      </Typography>
                  </Button>
                  </Tooltip>
{ cred.pdfLink &&
                  <Tooltip title={pdfButtonHelp}>
                 <Button fullWidth variant='outlined' onClick={()=>{}}>
                 <Typography
                        
                        align="center"
                        color="black"
                        fontSize=".7em"
                      >
                        PDF is available
                      </Typography>
                  </Button>
                  </Tooltip>
}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
       
      </Container>
      </>
  }
    </React.Fragment>
  );
}

export default function CredentialCollector() {
  return <CredList />;
}