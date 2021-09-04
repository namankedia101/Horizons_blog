import { Container, Typography } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import useStyles from "./styles";

const About = () => {
    const classes = useStyles();

    return (
        <>
        <Navbar color="#808080"/>
        <Container className={classes.root}>
            <Typography variant="h2" className={classes.constr}>This page is under construction😊</Typography>
        </Container>
        </>
    )
}

export default About
