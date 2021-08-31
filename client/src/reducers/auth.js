/* eslint-disable import/no-anonymous-default-export */
import { AUTH, LOGOUT } from "../constants/constants";

export default (state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return {...state, authData: action.data, loading: false, errors: null};
        
        case LOGOUT:
        localStorage.clear();
        return {...state,authData:null};   
        
        default:
            return "";    
    }
}