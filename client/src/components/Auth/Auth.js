import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import { signup, signin } from '../../actions/auth';
import auth from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import GoogleButton from "react-google-button";
import {GoogleLogin} from "react-google-login";
import {Container, Paper, Typography, Grid, Button, TextField, InputAdornment, IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from "./styles";

const initialState = { fullName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes= useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const actionCodeSettings = {
      url: 'https://warm-brushlands-22534.herokuapp.com/',
    };
    const password = true;

    const [verified, setVerified] = useState(false);

    const [form, setForm] = useState(initialState);
    const [isSignup,setSignUp] = useState(true);
    const [isVisible,showPassword] = useState(false);
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      
    if (isSignup) {
      createUserWithEmailAndPassword(auth,form.email , form.password)
      .then((userCredential)=>{
          // send verification mail.
        const user = userCredential.user;
        sendEmailVerification(user,actionCodeSettings);
        auth.signOut().then(alert("Verify your account from link sent to your Gmail"));   
      }).then(        
        dispatch(signup(form, history)));
      //.catch(alert("Something went wrong"));
    } else {
      dispatch(signin(form, history));
    }
  };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
   
    const handleShowPassword=()=>{
      showPassword(!isVisible);
    };
    
    const switchMode=()=>{
      setForm(initialState);
      setSignUp((isSignup)=>!isSignup);
      showPassword(false);
    };

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
  
      try {
        dispatch({ type: "AUTH", data: { result, token } });
  
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    };
  
   // const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
  
    return (
        <Container className={classes.root}>
        <Container className={classes.left}>
        <Grid className={classes.hero}>
        <Typography variant="h3">Hey</Typography>
            <Typography variant="h1">Welcome to our blog</Typography>
            <Typography variant="h5">We share ideas, hot updates on space, climate change, clean energy,etc.</Typography>
            <Typography variant="h4">Sign Up and get access to:</Typography>
            <Typography variant="h5">-{">"} Newsletter<br />-{">"} Posting comments</Typography>
        </Grid>
        </Container>    
        <Grid>
        <Paper className={classes.paper} elevation={3}>
            <Typography>Horizons</Typography>
          <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
          {isSignup ? (
            <Grid className={classes.signup}>
            <Grid container spacing={2} className={classes.items}>
              <TextField autoFocus name="fullName" value={form.fullName} variant="outlined" label="Full Name" required onChange={handleChange} />
            </Grid>
            <Grid container spacing={2} className={classes.items}>
              <TextField name="email" value={form.email} variant="outlined" label="Email" type="email" required onChange={handleChange} />
            </Grid>
            <Grid container spacing={2} className={classes.items}>
            <TextField name="password" variant="outlined" label="Password" type={isVisible ? 'text' : 'password'} required onChange={handleChange}
              InputProps={password ? {endAdornment:(<InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
              {isVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              </InputAdornment>)}:null}
          />            </Grid>
            <Grid container spacing={2} className={classes.items}>
              <TextField name="confirmPassword" value={form.confirmPassword} variant="outlined" label="Confirm Password" type="password" required onChange={handleChange} />
            </Grid>
            <Grid container spacing={2} className={classes.items}>
              <Button color="primary" variant="contained" type="submit">
                CREATE ACCOUNT
              </Button>  
            </Grid>
            <Grid container spacing={2} className={classes.items}>
            <Typography>or</Typography>
            <GoogleLogin 
              clientId="854415049304-eihcepvglrh6v140bd2u1t2oadplqkr9.apps.googleusercontent.com"
              render={(renderProps)=>(<Button className={classes.button} onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleButton /></Button>)}
              onSuccess={googleSuccess}
              cookiePolicy="single_host_origin"
            />
            </Grid>
            </Grid>
          ):(<Grid className={classes.signup}>
            <Grid container spacing={2} className={classes.items}>
              <TextField autoFocus name="email" value={form.email} variant="outlined" label="Email" type="email" required onChange={handleChange} />
            </Grid>
            <Grid container spacing={2} className={classes.items}>
              <TextField value={form.password} name="password" variant="outlined" label="Password" type={isVisible ? 'text' : 'password'} required onChange={handleChange}
              InputProps={password ? {endAdornment:(<InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
              {isVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              </InputAdornment>)}:null}
          />
            </Grid>
            <Grid container spacing={2} className={classes.items}>
              <Button color="primary" variant="contained" type="submit">
                SIGN IN
              </Button>  
            </Grid>
            <Grid container spacing={2} className={classes.items}>
            <Typography>or</Typography>
            <GoogleLogin 
              clientId="854415049304-eihcepvglrh6v140bd2u1t2oadplqkr9.apps.googleusercontent.com"
              render={(renderProps)=>(<Button className={classes.button} onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleButton /></Button>)}
              onSuccess={googleSuccess}
              cookiePolicy="single_host_origin"
            />
            
            </Grid>
            </Grid>)}
            <Grid className={classes.switch} container justifyContent="center">
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </form>
        </Paper>
        </Grid>
      </Container>
    );
  };
  
export default Auth
