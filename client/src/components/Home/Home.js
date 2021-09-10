import {Typography, Container, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination';
import Navbar from '../Navbar/Navbar';
import { verifyuser } from "../../actions/auth";
import {useDispatch} from "react-redux";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Home = () => {
   // const [currentId,setCurrentId] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1;

    const handleClick =()=>{
        const email ={email: user?.result?.email} ;
        console.log(email);
        dispatch(verifyuser(email));
        alert("Email verification link is sent to your Gmail Id. Please verify, link is valid for 10 minutes");
        setUser(null);
        dispatch({type:"LOGOUT"});
    }

    if(user?.result?.status === "pending"){
        return(<Container className={classes.root2}>
            <Typography variant="h2" className={classes.verify}>Hi {user?.result?.name},</Typography>
            <Typography variant="h2" className={classes.verify}>Please verify your Email</Typography>
            <Button onClick={handleClick} variant="contained" color="primary">Verify Email</Button>
        </Container>)
    }
    
    return (
        <Container className={classes.root}>
        {page<"2" ? (<><Navbar brand="#fff" color="#fff"/><Container className={classes.hero}>
        <div className={classes.mobileHero}>
            <Typography variant="h3">Hey</Typography>
            <Typography variant="h1">Welcome to our blog</Typography>
            <Typography className={classes.heroH5} variant="h5">We share ideas, hot updates on space, climate change, clean energy,etc.</Typography>
        </div>
        </Container></>):<><Navbar color="#808080" brand="#808080" /></>}
        <Posts className={classes.posts} />
        <Paper className={classes.pagination}>
        <Pagination page={page} />
        </Paper>                
        </Container>
    )
}

export default Home
