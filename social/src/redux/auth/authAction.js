import axios from 'axios';
import Cookies from "js-cookie";

import createToast from '../../utility/toast';
import { REGISTER_FAILED, REGISTER_REQUEST } from './actionType';




// user register
export const userRegister = (data, setInput, e, setRegister, navigate) => async (dispatch) => {

    try {
        dispatch({
            type: REGISTER_REQUEST,
        });
        await axios.post('/api/v1/user/register', data)
            .then((res) => {
                createToast("User register successful", "success");
                dispatch({
                    type: REGISTER_FAILED,
                    payload: res.data.message,
                });
                setInput({
                    fname: "",
                    sname: "",
                    emailOrMobile: "",
                    password: "",
                    day: "",
                    month: "",
                    year: "",
                    gender: "",
                });
                e.target.reset();
                setRegister(false);
                navigate("/activation/account");
            })


            .catch((error) => {
                createToast(error.response.data.message, "error");
                dispatch({
                    type: REGISTER_FAILED,
                    payload: error.response.data,
                });
            });
    } catch (error) {
        createToast(error.response.data.message, "error");
        dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data,
        });
    }
};




// user account activation by OTP
export const activationByOTP = ({ code, email }, navigate) => async (dispatch) => {
    try {
        await axios.post("/api/v1/user/code-activate", {
            code: code,
            email: email,
        })
            .then(res => {
                createToast("Account activate successful", 'success');
                Cookies.remove("otp");
                navigate("/login");
            })
            .catch(error => {
                createToast(error.response.data.message);
            });

    } catch (error) {
        createToast(error.response.data.message);
    }
};


// user account reset by OTP
export const resentLink = (email, navigate) => async (dispatch) => {
    try {
        await axios.post("/api/v1/user/resend-activate", {
            auth: email,
        })
            .then(res => {
                createToast(res.data.message, 'success');
                navigate("/activation/account");
            })
            .catch(error => {
                createToast(error.response.data.message);
            });

    } catch (error) {
        createToast(error.response.data.message);
    }
};


// check password reset code
export const checkPasswordResetCode = (data, navigate) => async (dispatch) => {
    try {
        await axios.post("/api/v1/user/check-password-reset-otp", {
            auth: data.auth,
            code: data.code,
        })
            .then((res) => {
                createToast(res.data.message, 'success');
                navigate("/change-password");
            })
            .catch((error) => {
                createToast(error.response.data.message);
            });

    } catch (error) {
        createToast(error.response.data.message);
    }
};

/**
 * Change Password
 * 
 * @param {*} data 
 * @param {*} navigate 
 * @returns 
 */

export const changePassword = (data, navigate) => async (dispatch) => {
    try {
        await axios.post("/api/v1/user/user-password-reset", {
            id: data.id,
            code: data.code,
            password: data.password
        })
            .then((res) => {
                createToast(res.data.message, 'success');
                navigate("/login");
            })
            .catch((error) => {
                createToast(error.response.data.message);
            });

    } catch (error) {
        createToast(error.response.data.message);
    }
};
