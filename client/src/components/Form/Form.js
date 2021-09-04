import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from "react-file-base64";
import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import useStyles from "./styles";
import { createPost } from '../../actions/posts';
import Navbar from '../Navbar/Navbar';

const Form = () => {

    const creators = ["kediaarts@gmail.com","rhythmbhatia28@gmail.com","jayverma878@gmail.com","vsviveksonu@gmail.com"];

    const classes= useStyles();
    const dispatch= useDispatch();
    const [postData,setPostData]=useState({
        title:"", message:"", selectedFile:""
      });

      const user = JSON.parse(localStorage.getItem("profile"));
      const [role,setRole] = useState(false);
  
      useEffect(()=>{
          creators.map((creator)=> {if(creator===user?.result?.email)setRole(true)});
      },[]);
    
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
        
    return (<>
        {role ? <Container className={classes.formContainer}>
        <Navbar color="#fff"/>
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
        </Container> : <Typography variant="h1">Action not allowed!</Typography>}
        </>
    )
}

export default Form
