import { Grid, CircularProgress } from '@material-ui/core';
import React from 'react';
import Post from './Post/Post';
import useStyles from "./styles";
import {useSelector} from "react-redux";

const Posts = () => {
    const classes = useStyles();
    const {posts}= useSelector((state) => (state.posts));
    const {isLoading} = useSelector((state) => (state.posts));
  
   //if(!Loading && !posts.length) return "No posts available";

    return (
      isLoading ? <CircularProgress className={classes.progress}/> :(
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts?.map((post)=>(
            <Grid key={post._id} item  className={classes.post}>
            <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )
  
    );
}

export default Posts
