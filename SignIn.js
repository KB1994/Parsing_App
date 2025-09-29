import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../Axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../img/logo.png";
import thumbnail_QoC from "../img/thumbnail_QoC.png";
import '../css/Generator.css';
import { Form, Col } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MainPage from "./MainPage";
import {Tabs, Tab, Spinner} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
   
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [Userdata, setUserdata] = useState({ username: "", password: "" });
  

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...Userdata, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(Userdata.username);
    console.log(Userdata.password);
    try {
      const response = await axiosInstance.post("api_auth/api/token/", {
        username: Userdata.username,
        password: Userdata.password,
      });
      if (response.status === 200) {
        //let base64User = response.data.access.split(".")[1];
        //base64User = JSON.parse(window.atob(base64User));
        localStorage.setItem(
          "currentUser",
          window.atob(response.data.access.split(".")[1])
        );
        window.location.href = "/MainPage";
        
        
         
      }
    } catch (error) {
      console.log(error);
    }
    
  };
    
    const userTemplate = {
        username: "",
        email: "",
        password1: "",
        password2: "",
    }
    
    const [newUser, setNewUser] = useState(userTemplate)
    const [passwordShown, setPasswordShown] = useState(false);
    const [resendTo, setResendTo] = useState("")
    
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
    
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewUser((state) => {
            state[name] = value
            return {...state}
        })
    }
    
    const handleResendChange = (e) => {
        setResendTo(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/api_qoc/users/', newUser)
            alert('User created, confirmation mail sent')
            setNewUser(userTemplate)
            window.location.href = "/"
        } catch (error) {
            console.log(error.response)
            alert(error.response.data.error)
        }
    }
    
    const handleResendSubmit = async(e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/api_qoc/resend/', {username: resendTo})
            alert('Confirmation mail was resent')
        } catch (error) {
            console.log(error.response)
            alert(error.response.data.error)
        } finally {
            setResendTo("")
        }
    }
    


  return (
      
      
      <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="Register" title="Register">
    
      
      
      <div className='form-div'>
            <Form onSubmit={handleSubmit}>
                <h3>Créer un Compte</h3>
                <Form.Group as={Col} controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required value={newUser.username} onChange={handleChange} name='username' type='text' placeholder='Choose username' />
                </Form.Group>

                <Form.Group as={Col} controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required value={newUser.email} onChange={handleChange} name='email' type='email' placeholder='Enter your workmail' />
                </Form.Group>

                <Form.Group as={Col} controlId='password1'>
                    <Form.Label>Password</Form.Label>
                    <RemoveRedEyeIcon style={{marginLeft:'10px'}} onClick={togglePassword}/>
                    <Form.Control required value={newUser.password1} onChange={handleChange} name='password1' type={passwordShown ? "text" : "password"} placeholder='Password' />
                    
                </Form.Group>
                
                <Form.Group as={Col} controlId='password2'>
                    <Form.Label>Retype password</Form.Label>
                    <Form.Control required value={newUser.password2} onChange={handleChange} name='password2' type={passwordShown ? "text" : "password"} placeholder='Password again' />
                </Form.Group>


                <Button style={{marginTop:'10px', marginBottom:'5px'}}variant="primary" type="submit">
                    Register
                </Button>

                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </Form>
            
            <form onSubmit={handleResendSubmit}>
                <input required onChange={handleResendChange} value={resendTo} placeholder='Username' type='text'/> <Button size='sm' variant="secondary" type="submit"> Resend </Button>
                <p>
                    Resend activation Mail
                </p>
            </form>

                
        </div>
      
  </Tab>
  <Tab eventKey="Login" title="Login">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} >
        
            <img
            src ={thumbnail_QoC} 
            width="50%"
            alt="First slide"
          ></img>
    
        <Typography component="h1" variant="h5">
          Qoc
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Utilisateur"
            name="username"
            autoComplete="username"
            value={Userdata.username}
            onChange={handleInputChanges}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            value={Userdata.password}
            onChange={handleInputChanges}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Connexion
          </Button>
        </form>
      </div>
    </Container>
  </Tab>
  
</Tabs>
    
  );
}
