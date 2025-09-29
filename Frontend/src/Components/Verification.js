import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios";
import {Grid , Paper, Typography, Button} from '@material-ui/core';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { makeStyles } from "@material-ui/core/styles";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import history from "./history";
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(35),
    },
  },
    
 
}));

const Verification = (props) =>{
    const classes = useStyles();
    const [open_dialog, setOpen_dialog] = React.useState(false);
    
    useEffect(()=>{
       console.log(window.location.href); 
       let url = window.location.href;
       let splited = url.split('http://127.0.0.1:8015/');
       console.log("splited",splited);
       sendVerify(splited[1]);
       console.log("EMAIL",props.match.params.encode_email);
       console.log("Token",props.match.params.token);
    },[])
    
    
    const sendVerify = async (url) =>{
        
        
        
        try{
            
            const response = await axiosInstance.get('/api_qoc/EmailVerification/');
            console.log(response);
            if(response.statusText === "OK"){
                setOpen_dialog(true);
            }
            
        }catch (error) {
          console.log(error);
        }
           
    }
    
    const handleGoLogin = () =>{
        history.push('/');
    }
    
    return(
        <React.Fragment>
        <div style={{ padding: 100 }}>
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                    <Grid item xs>
                        
                    <div className={classes.root}>
                        <Paper elevation={3} >
                            
                             <div style={{ padding: 50 }}>
                                
                            <Grid 
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={5}
                            >   
                                    
                                <Grid item xs>
                                    <HourglassEmptyIcon fontSize="large" color="secondary"/>
                                    
                                </Grid>
                                
                                <Grid item xs>
                                    <Typography variant="h5" noWrap={true}>
                                        Vérifier l'inscription...
                                    </Typography>
                                </Grid>

                            </Grid>
                            </div>
                                
                        </Paper>
                    </div>  
                  
                    </Grid>
                    
                    
            </Grid>
        </div>

         <React.Fragment>
        <Dialog
          open={open_dialog}
          onClose={handleGoLogin}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
               <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">
            
                <Grid item xs>
                  <VerifiedUserIcon color="primary" fontSize="large"/>
                </Grid>

                <Grid item xs>
                    <DialogContentText id="alert-dialog-description">
                     Compte vérifié!
                    </DialogContentText>
                </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
                 
           <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">
                   
               <Grid item xs>     
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGoLogin}
                    >
                      Login
                    </Button>
                </Grid>

            </Grid>

          </DialogActions>
        </Dialog>
      </React.Fragment>



        </React.Fragment>
    );
}

export default Verification;
