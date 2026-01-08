import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    accessToken: null
};

const StoreSlice = createSlice({
    name:"user",
    initialState,
    reducers:
    {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logoutuser:(state,action)=>
        {
            state.user = null;
            state.accessToken = null
        }
    }
})
    
export const { setUser, logoutUser } = StoreSlice.actions;
export default StoreSlice.reducer;
