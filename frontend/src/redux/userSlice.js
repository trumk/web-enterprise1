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
        editProfile: {
            currentProfile: null,
            isFetching: false,
            error: false,
        }
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
        editProfileStart: (state) => { 
            state.editProfile.isFetching = true;
        },
        editProfileSuccess: (state, action) => {
            state.editProfile.isFetching = false;
            state.editProfile.currentProfile = action.payload;
            state.editProfile.error = false;
        },
        editProfileFailed: (state) => {
            state.editProfile.isFetching = false;
            state.editProfile.error = true;
        }
    }
});

export const { 
    getUsersStart, 
    getUsersSuccess, 
    getUsersFailed,
    getSelfStart,
    getSelfSuccess,
    getSelfFailed,
    editProfileStart,
    editProfileSuccess,
    editProfileFailed
} = userSlice.actions;

export default userSlice.reducer;