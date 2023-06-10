import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
var initialState={
    searchedBlogs:new Array(),
    searchedUsers:new Array()
}

const searchSlice=createSlice({
    name:'search',
    initialState:initialState,
    reducers:{
        fetchSearch(state,action){
           state.searchedBlogs=action.payload.Blogs;
           state.searchedUsers=action.payload.Users;
        }
    }
})
export const { fetchSearch}=searchSlice.actions
export default searchSlice.reducer

export const fetchSearchResult=(e,search)=>{
    e.preventDefault();
    return async function fetchSearchThunk(dispatch,getState){
        try{
            await axios.post("http://localhost:5000/search",{ value: search }).then((res) => {
                dispatch(fetchSearch(res.data))
            });
        }catch(err){
            console.log("error while fetching search result");
        }
    }
}

