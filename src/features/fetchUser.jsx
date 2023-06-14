import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState={
    user:null,
    STATUS:null,
}

const fetchUserSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setStatus(state,action){
            state.STATUS=action.payload
        }
    }
})
export const { setUser ,setStatus }=fetchUserSlice.actions;
export default fetchUserSlice.reducer

export function fetchUser(){
    return async function fetchUserThunk(dispatch,getState){
        dispatch(setStatus("LOADING"));
        try{
            const { data } = await fetch("https://bblog-blogging-site.onrender.com/api/current_user",{
                method:'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:'include'
            });
            dispatch(setUser(data));
            console.log(data, "error data not getten");
            dispatch(setStatus("IDLE"));
        }catch(err){
            console.log("error while getting user",err);
        }
    }
}