import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState={
    blogs:new Array()
}

const fetchBlogSlice=createSlice({
    name:'Blogs',
    initialState:initialState,
    reducers:{
        fetchblog(state,action){
           state.blogs=action.payload;
           state.blogs.reverse();
        }
    }
})
export const { fetchblog }=fetchBlogSlice.actions;
export default fetchBlogSlice.reducer

function fetchBlogsPosts(){
    return async function fetchBlogsThunk(dispatch,getState){
        try{
            await axios.get('http://localhost:5000/getblogs').then((res)=>{
                dispatch(fetchblog(res.data));
            })
        }catch(err){
            console.log("error while getting Blogs",err);
        }
    }
}
export {fetchBlogsPosts}
