import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        user: {
            user: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        getSelfStart: (state) => {
            state.user.isFetching = true;
        },
        getSelfSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.user = action.payload;
            state.user.error = false;
        },
        getSelfFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
    }
});

export const { 
    getUsersStart, 
    getUsersSuccess, 
    getUsersFailed,
    getSelfStart,
    getSelfSuccess,
    getSelfFailed,
} = userSlice.actions;

export default userSlice.reducer;