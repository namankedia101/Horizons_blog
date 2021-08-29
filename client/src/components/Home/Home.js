import {Typography, Container, Paper } from '@material-ui/core';
import React, {useState} from 'react';
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination';
import Navbar from '../Navbar/Navbar';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Home = () => {
    const [currentId,setCurrentId] = useState(0);
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;

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
