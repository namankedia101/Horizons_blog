import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from "react-file-base64";
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import useStyles from "./styles";
import { createPost } from '../../actions/posts';
import Navbar from '../Navbar/Navbar';

const Form = () => {

    const creators = ["kediaarts@gmail.com","rhythm7001@gmail.com","jayverma878@gmail.com","vsviveksonu@gmail.com"];
    const {isLoading} = useSelector((state)=>state.posts);
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
        const byteSize = str => new Blob([str]).size;
        const size = byteSize(postData.selectedFile);
        
        if(postData.selectedFile===""){
            alert("Please provide an image for blog");
        }else if(size > 200000){
            alert("Maximum file size allowed is 200kb");
            setPostData({...postData ,selectedFile: '' });
        }else {
        let result= window.confirm("Are you sure to post the blog?");
        if(result){
            dispatch(createPost(postData));
            clear();
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
