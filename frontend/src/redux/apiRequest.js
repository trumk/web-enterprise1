import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post(`${process.env.BACKEND_URL}/login`, user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch(err){
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${process.env.BACKEND_URL}/register`, user); // Gọi API từ cổng 5503
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(registerFailed());
    }
}