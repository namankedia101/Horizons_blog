import * as api from "../api/index";

export const createPost=(post)=>async(dispatch)=>{
    try{
        dispatch({type:"START_LOADING"});
        const {data}= await api.createPost(post);
        dispatch({type:"CREATE", payload:data});
    }catch(error){
        console.log(error);
    }
}

export const getPosts=(page)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"});
        const {data:{data,currentPage,numberOfPages}}= await api.fetchPosts(page);
        dispatch({type:"FETCH_ALL", payload:{data,currentPage,numberOfPages}});
        dispatch({type:"END_LOADING"});
    } catch (error) {
        console.log(error);
    }
}