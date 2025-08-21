import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",      // Slice name
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        // actions
        setLoading:(state, action) => {        // setLoading - Just a Function
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        }
    }
});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;