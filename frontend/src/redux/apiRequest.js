import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess, verifyFailed, verifyStart, verifySuccess } from "./authSlice";

const BACKEND_URL = 'http://localhost:5503'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BACKEND_URL}/login`, user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, handleSuccess) => {
    dispatch(registerStart());
    try {
        await axios.post(`${BACKEND_URL}/register`, user);
        dispatch(registerSuccess());
        handleSuccess();
    } catch (err) {
        dispatch(registerFailed());
    }
};
export const verifyAccount = async (user, dispatch, navigate) => {
    dispatch(verifyStart());
    try {
        await axios.post(`${BACKEND_URL}/verify`, user);
        dispatch(verifySuccess());
        navigate("/login");
    } catch (err) {
        dispatch(verifyFailed());
    }
};
