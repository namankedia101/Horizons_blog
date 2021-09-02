import { Container, Typography, LinearProgress, Paper } from '@material-ui/core';
import React, {useEffect} from 'react';
import Detail from "./Detail";
import {getPost} from "../../actions/posts";
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from "./styles";

const PostDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();   
    const {post,isLoading} = useSelector((state)=>(state.posts));

    useEffect(()=>{
        dispatch(getPost(id));
    },[id,dispatch]);

    return (<div>
    <Navbar color="#808080"/>
        {isLoading ? (<LinearProgress />) : 
   (<Detail post={post} />)}</div>)
}        
export default PostDetails
