import { Container, Typography, LinearProgress, CircularProgress, Paper } from '@material-ui/core';
import React, {useEffect} from 'react';
import {getPost} from "../../actions/posts";
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from "./styles";

const PostDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();   
    const {post} = useSelector((state)=>(state.posts));
    const {isLoading} = useSelector((state)=>(state.posts));

    useEffect(()=>{
        dispatch(getPost(id));
    },[]);

    return (<div>
    <Navbar color="#808080"/>
        {isLoading ? (<div><LinearProgress /></div>) : 
   (<Container className={classes.root}>
        <Typography variant="h1" >{post.title}</Typography>
    </Container>)}</div>)
}        
export default PostDetails
