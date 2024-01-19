import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CheckBox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Help from '../components/Help'
import Tooltip from '@mui/material/Tooltip';
import {useLocation, useNavigate} from 'react-router-dom'
import defaultValues from '../data/defaultValues.js';
import OrcidConfirmDialog from '../components/OrcidConfirmDialog';
import QRCode from "react-qr-code";

//const exchangeHost = 'https://issuer.dcconsortium.org'
const exchangeHost = process.env.REACT_APP_PUBLIC_EXCHANGE_HOST || 'http://localhost:4005' 

const LCWHelp = "Adds this credential to the Digital Credentials Consortium Learner Credential Wallet."
const ORCIDHelp = "Add this credential to your ORCID profile."
const ORCIDBundleHelp = "Add to a bundle that you can thenb submit to ORCID in one step."
const ORCIDBundleSubmitHelp = "Submit all selected credentials to ORCID in one step."

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return response.json();
}

function isOrcidCompatible(cred) {
  return cred.metadata.orcidCompatible || cred.metadata.orcidBundle
}

function isOrcidSelectable(cred) {
  return cred.metadata.orcidCompatible && ! cred.metadata.orcidBundle
}




function CredList() {

  const [list, setList] = useState(null)
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const [isSelected, setIsSelected] = useState({});
  
  const handleChecked = cred => e => {
    const { checked } = e.target;
      setIsSelected({
        ...isSelected,
        [cred.retrievalId]: checked
      });
  };

  function goToCollectorPage(cred) {
    return () => {navigate('/lcp/collector', { state: {cred} })}
  }

  function getDeepLink(cred) {
    return () => { window.location.href = cred.directDeepLink } 
   }

  useEffect(() => {
    
    const queryParams = new URLSearchParams (location.search) ;
    const isDemo = queryParams.get('demo')
    const listURI = queryParams.get('list') ;
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
    } else if (location.state || isDemo) {
      //const passedState = location.state
       postData(`${exchangeHost}/exchange/setup`, defaultValues).then((response) => {
        console.log("the data returned from the call:")
        console.log(response)
            setList(response)
            setIsLoaded(true)
        });
    } else {
     // setIsLoaded(true)
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
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Your Credentials
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          You have the following verifiable credentials available for collection. <br/>
          
          If you are adding to ORCID, you may add each individually 
          or bundle them by selecting those you want and then
          submitting the resulting bundle.

        </Typography>
      </Container>
      

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {list.map((cred) => (
            <Grid
              item
              key={cred.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card sx={{minHeight: '36vw'}}>
                <CardHeader
                  title={cred.metadata.displayTitle}
                  subheader={cred.metadata.displaySubtitle}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: "#2196f3",
                    minHeight: '12vw'
                  }}
                ></CardHeader>
         
                <CardActions >
              <Stack spacing={2} sx={{marginLeft:'auto', marginRight:'auto', marginBottom: '1.5em', marginTop: '1.5em'}}>
              <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={cred.directDeepLink}
    viewBox={`0 0 256 256`}
    />
    </div> 
             
                  <Tooltip title={LCWHelp}>
                    
                 <Button fullWidth variant='outlined' onClick={getDeepLink(cred)} sx={{backgroundColor:"lightblue"}}>
                 <Typography
                        
                        align="center"
                        color="black"
                        fontSize=".7em"
                      >
                        Click to Add to Wallet
                      </Typography>
                      
                  </Button>
                  
                  </Tooltip>
    { isOrcidCompatible(cred) &&
<>
                  <Tooltip title={ORCIDHelp}>
                  <OrcidConfirmDialog buttonTitle="Add to my ORCID Profile"/>
                  </Tooltip>
                  
                  </>
}
    { isOrcidSelectable(cred)  &&
                    <>
                    <Divider orientation="horizontal" flexItem />
                  <Tooltip title={ORCIDBundleHelp}>
                 <Button fullWidth variant='outlined' sx={{backgroundColor:"#accc54"}}>
                 <Typography
                        
                        align="center"
                        color="black"
                        fontSize=".7em"
                      >
                        Select for ORCID <CheckBox
                      color="primary"
                      checked={isSelected[cred.retrievalId]}
                      onClick={handleChecked(cred)}
                    />
                      </Typography>
                  </Button>
                  </Tooltip>
                  </>
}
                  </Stack>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Tooltip title={ORCIDBundleSubmitHelp}>
        <OrcidConfirmDialog margin={5} buttonTitle="Add selected credentials to your ORCID Profile"/>
                 
                  </Tooltip>
      </Container>
      </>
  }
    </React.Fragment>
  );
}

export default function CredentialList() {
  return <CredList />;
}