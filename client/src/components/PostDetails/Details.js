import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from "./styles";
import { Container, Typography, LinearProgress, CircularProgress } from '@material-ui/core';

const Details = ({post}) => {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.root}>
        <Typography variant="h1" >{post.title}</Typography>
    </Container>
        </div>
    )
}

export default Details
