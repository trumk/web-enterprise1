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
        },
        enrollFaculty: {
            isFetching: false,
            error: false,
        },
        statistic: {
            data: null,
            isFetching: false,
            error: false,
        },
        getFacultyLogin: {
            data: null,
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
        },
        setRoleStart: (state) => {
            state.user.isFetching = true;
        },
        setRoleSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.user = action.payload;
            state.user.error = false;
        },
        setRoleFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        enrollFacultyStart: (state) => {
            state.enrollFaculty.isFetching = true;
        },
        enrollFacultySuccess: (state) => {
            state.enrollFaculty.isFetching = false;
            state.enrollFaculty.error = false;
        },
        enrollFacultyFailed: (state) => {
            state.enrollFaculty.isFetching = false;
            state.enrollFaculty.error = true;
        },
        getStatisticStart: (state) => {
            state.statistic.isFetching = true;
        },
        getStatisticSuccess: (state, action) => {
            state.statistic.isFetching = false;
            state.statistic.data = action.payload; 
            state.statistic.error = false;
        },
        getStatisticFailed: (state) => {
            state.statistic.isFetching = false;
            state.statistic.error = true;
        },
        getFacultyLoginStart: (state) => {
            state.getFacultyLogin.isFetching = true;
        },
        getFacultyLoginSuccess: (state, action) => {
            state.getFacultyLogin.isFetching = false;
            state.getFacultyLogin.data = action.payload; 
            state.getFacultyLogin.error = false;
        },
        getFacultyLoginFailed: (state) => {
            state.getFacultyLogin.isFetching = false;
            state.getFacultyLogin.error = true;
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
    editProfileStart,
    editProfileSuccess,
    editProfileFailed,
    setRoleStart,
    setRoleSuccess,
    setRoleFailed,
    enrollFacultyStart,
    enrollFacultySuccess,
    enrollFacultyFailed,
    getStatisticStart,
    getStatisticSuccess,
    getStatisticFailed,
    getFacultyLoginStart,
    getFacultyLoginSuccess,
    getFacultyLoginFailed,
} = userSlice.actions;

export default userSlice.reducer;