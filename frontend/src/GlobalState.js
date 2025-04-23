import { createContext, useEffect, useState } from "react";
import { ProductApi } from "./api/ProductApi";
import axios from "axios";
import { UserApi } from "./api/UserApi";

export const GlobalState=createContext();
export const DataProvider=({children})=>{
    const [token,setToken]=useState(null);
    const refresh_token=async()=>{
        try{
            const res=await axios.post('/user/refresh_token');
            console.log(res); 
            setToken(res.data.rf_token); 
        }
         catch(err){
            alert(err.response.data.msg);
         }
    }
    const firstLogin=localStorage.getItem('firstLogin');
    useEffect(()=>{
        // const firstLogin=localStorage.getItem('firstLogin');
        if(firstLogin){
            refresh_token();
        }
    },[firstLogin])
    const state={
        token:[token,setToken],
        ProductApi:ProductApi(),
        UserApi:UserApi(token)
    }
    // ProductApi();
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}