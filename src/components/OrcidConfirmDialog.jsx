import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function OrcidConfirmDialog({ buttonTitle, margin }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    function openOrcid() {
        setOpen(true)
        window.open("https://orcid.org/signin", "_blank")
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button sx={{margin, backgroundColor:"#accc54"}}  variant='outlined' onClick={handleClickOpen} >
                <Typography
                    align="center"
                    
                    color="black"
                    fontSize=".7em"
                >
                    {buttonTitle}
                </Typography>
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Credentials to ORCID Profile"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to be redirected to your ORCID account, where you will be prompted to login and confirm the addition of your credentials to your ORCID profile.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={openOrcid} autoFocus sx={{minWidth:"28em"}}>
                        Add to my ORCID Profile
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}