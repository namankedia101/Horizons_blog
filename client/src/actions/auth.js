import * as api from "../api/index";
import { AUTH } from "../constants/constants";

export const signin = (formData, history)=>async(dispatch)=>{
    try {
        const {data} =await api.signIn(formData);
        dispatch({type:AUTH, data});
        //history.push("/");
        window.location.href="/";
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history)=>async(dispatch)=>{
    try {
        const {data} =await api.signUp(formData);
        //dispatch({type:AUTH, data});
    } catch (error) {
        console.log(error);
    }
}

export const verifyuser = (verifyData)=>async(dispatch)=>{
    try{
        const {data}=await api.verifyUser(verifyData);
    } catch (error){
        console.log(error);
    }
}