import { configureStore } from "@reduxjs/toolkit";
import fetchUserReducer from './fetchUser.jsx'
import fetchBlogSlice from "./fetchBlogs.jsx";
import searchSlice from "./searchSlice.jsx";
const store=configureStore({
    reducer:{
        users:fetchUserReducer,
        blogs:fetchBlogSlice, 
        search:searchSlice,
    }
})

export default store;