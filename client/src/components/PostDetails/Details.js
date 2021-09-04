import { Container, Typography} from '@material-ui/core';
import React from 'react';
import Navbar from "../Navbar/Navbar";
import {useSelector } from 'react-redux';
import useStyles from "./styles";
import moment from "moment";

const Details = () => {
    const classes = useStyles();
    const { post} = useSelector((state)=>state.posts);

    return (<>
         <Container className={classes.root}>
         <Navbar color="#808080" />
            <Typography className={classes.heading} variant="h1">{post.title}</Typography>
            <img className={classes.postImg} src={post.selectedFile} alt="img"/>
            <Typography className={classes.date} variant="h6">Published on: {moment(post.createdAt).format('DD/MM/YYYY')}</Typography>
            <Typography className={classes.message} variant="h5">{post.message}</Typography>
        </Container>
        </>
    )
}

export default Details
