import * as api from "../api/index";
//import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, CREATE } from "../constants/constants";

export const getPosts=(page)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"});
        const {data:{data,currentPage,numberOfPages}}= await api.fetchPosts(page);
        dispatch({type:"FETCH_ALL", payload:{data,currentPage,numberOfPages}});
        dispatch({type:"END_LOADING"});
    } catch (error) {
        console.log(error);
    }
};

// export const getPost= (id) => async (dispatch) => {
//     try {
//         dispatch({type:"START_LOADING"});
//         const {data} = await api.fetchPost(id);
//         dispatch({type:"FETCH_POST", payload:data});
//         dispatch({type:"END_LOADING"});
//     } catch (error) {
//         console.log(error);
//     }
// };

export const createPost=(post)=>async(dispatch)=>{
    try{
        dispatch({type:"START_LOADING"});
        const {data}= await api.createPost(post);
        dispatch({type:"CREATE", payload:data});
    }catch(error){
        console.log(error);
    }
};
