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
        },
        msg: "",
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.msg = "Login successfully";
        },
        loginFailed: (state, action) =>{
            state.login.isFetching = false;
            state.login.error = true;
            state.msg = action.payload;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
            state.msg = action.payload;
        },
        registerFailed: (state, action) =>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
            state.msg = action.payload;
        },
        verifyStart: (state) => {
            state.verify.isFetching = true;
        },
        verifySuccess: (state, action) => {
            state.verify.isFetching = false;
            state.verify.error = false;
            state.verify.success = true;
            state.msg = action.payload;
        },
        verifyFailed: (state, action) => {
            state.verify.isFetching = false;
            state.verify.error = true;
            state.verify.success = false;
            state.msg = action.payload;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            state.msg = "Logout successfully";
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
            state.msg = "Logout failed";
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
            state.msg = action.payload;
        },
        changePasswordFailed: (state) => {
            state.changePassword.isFetching = false;
            state.changePassword.error = true;
            state.msg = "Change password failed";
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