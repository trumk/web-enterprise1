import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess, verifyFailed, verifyStart, verifySuccess } from "./authSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

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
export const verifyAccount = async (otp, dispatch, navigate) => {
    dispatch(verifyStart());
    try {
        await axios.post(`${BACKEND_URL}/verify`, otp);
        dispatch(verifySuccess());
        navigate("/login");
      } catch (err) {
        dispatch(verifyFailed());
        console.error("Verification error:", err);
      }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try{
        await axios.post(`${BACKEND_URL}/logout`, id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate("/login");
    }
    catch (err) {
        dispatch(logoutFailed());
        console.error("Logout error:", err);
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get(`${BACKEND_URL}/user/getAllUsers`, {
            headers: {
                token: `Bearer  + ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};
