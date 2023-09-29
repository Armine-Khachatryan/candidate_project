import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../features/User/UserSlice";



export const store = configureStore({
    reducer:{
        user: userSlice,
    }
})