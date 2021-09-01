/* eslint-disable import/no-anonymous-default-export */
//import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, CREATE } from "../constants/constants";

export default (state ={isLoading:true, posts:[]},action)=>{
    switch(action.type){
        case "START_LOADING":
            return {...state, isLoading:true};

        // case "FETCH_POST":
        //     return {...state,post:action.payload};
        
        case "FETCH_ALL":
            return{...state,
               posts:action.payload.data,
               currentPage:action.payload.currentPage,
               numberOfPages:action.payload.numberOfPages
            };

        case "CREATE":
            return{...state,posts:[...state.posts,action.payload]};
        
        case "END_LOADING":
            return {...state, isLoading:false};

        default:
            return "";    
    }
}