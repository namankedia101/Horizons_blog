import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from "react-file-base64";
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import useStyles from "./styles";
import { createPost } from '../../actions/posts';

const Form = () => {
    const classes= useStyles();
    const dispatch= useDispatch();
    const [postData,setPostData]=useState({
        title:"", message:"", selectedFile:""
      });
    
    const history = useHistory();

    const clear=()=>{
        //setCurrentId(null);
        setPostData({ title: '', message: '', selectedFile: '' });
    } 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(postData.selectedFile===""){
            alert("Please provide an image for blog");
        }else{
        let result= window.confirm("Are you sure to post the blog?");
        if(result){
            dispatch(createPost(postData));
            clear();
            history.push("/");
        }else{
            return;
        }
       
    }
    }   
        
    return (
        <Container className={classes.formContainer}>
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h2">Create a New Blog</Typography>
                <TextField name="title" value={postData.title} label="Title" variant="outlined" onChange={(e)=>setPostData({...postData,title:e.target.value})} fullWidth className={classes.title} />
                <TextField name="message" value={postData.message} variant="outlined" label="Blog Content" onChange={(e)=>setPostData({...postData,message:e.target.value})} multiline fullWidth className={classes.content}/>
                <div className={classes.fileInput}>
                <Typography className={classes.file}>Add images:</Typography>
                <FileBase type="file"  onDone={({base64})=>setPostData({...postData, selectedFile:base64})}/>
                </div>
                <Button variant="contained" color="primary" className={classes.button} type="submit">Create</Button>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={clear}>Cancel</Button>
            </form>
        </Paper>
        </Container>
    )
}

export default Form
