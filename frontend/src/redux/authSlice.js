import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        verify: {
            isFetching: false,
            error: false,
            success: false,
        },
        logout:{
            isFetching: false,
            error: false,
        },
        changePassword: {
            currentUser: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) =>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) =>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false
        },
        verifyStart: (state) => {
            state.verify.isFetching = true;
        },
        verifySuccess: (state) => {
            state.verify.isFetching = false;
            state.verify.error = false;
            state.verify.success = true;
        },
        verifyFailed: (state) => {
            state.verify.isFetching = false;
            state.verify.error = true;
            state.verify.success = false;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        changePasswordStart: (state) => {
            state.changePassword.isFetching = true;
        },
        changePasswordSuccess: (state, action) => {
            state.changePassword.isFetching = false;
            state.changePassword.currentUser = action.payload;
            state.changePassword.error = false;
        },
        changePasswordFailed: (state) => {
            state.changePassword.isFetching = false;
            state.changePassword.error = true;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerFailed,
    registerSuccess,
    verifyStart,
    verifySuccess,
    verifyFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailed,
} = authSlice.actions;

export default authSlice.reducer;