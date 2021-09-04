import React, {useEffect,useState} from 'react';
import { getPost } from '../../actions/posts';
import {Typography, LinearProgress, Container} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import Details from './Details';

const PostDetails = () => {
    const dispatch = useDispatch();
    // const location = useLocation();
    const {id} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const { post} = useSelector((state)=>state.posts);
    
    useEffect(()=>{
        dispatch(getPost(id));
        if(post)setIsLoading(false);
    },[post,id]);

    return (
        <>
           {isLoading ? <LinearProgress/> : <Details loading={setIsLoading}/>}
        </>
    )
};

export default PostDetails
