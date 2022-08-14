import axios from "axios";
import { toast } from "react-toastify";
import { registerUser, loginUser, verifyEmail, checkVerifyEmail, verifyEmailChangePassword, logout, changePassword, checkVerifyEmailChangePassword, findUser, coreUserData } from "../../service/userService"
import { CheckFormat } from "../../Utils/Auth/CheckFormtValue";
import { handleNextInput } from "../../Utils/focusNextInput";
import { showInputErrorToast, showToast } from "../../Utils/toastifyPromise";



export const coreUser = () => {
    return async (dispatch, getState) => {
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }
        let toastMessage = "";

        const token=localStorage.getItem("token");
        if (token!=="undefined"&&token!=null&&token) {
            axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
        }

        // debugger
        try {
            //handle show loadin
            {
                loadingState.ProcessingDelay = loadingState.ProcessingDelay.filter(item => item != "editProfile");
                loadingState.ProcessingDelay.push("coreUserData");
                loadingState.canRequest = false;
                await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
            }

            const { data, status } = await coreUserData();
            if (status == 200 && data.status == true) {
                state.userData = data.data;

                //handle hide loading
                {
                    const loadingState1 = { ...getState().loadingState }
                    var removeProcessingItem = loadingState1.ProcessingDelay.filter(item => item != "coreUserData");
                    loadingState1.ProcessingDelay = removeProcessingItem;
                    loadingState1.canRequest = removeProcessingItem.length > 0 ? false : true;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState1 })
                }
            } else {
                // data.errors.forEach(element => {
                //     toastMessage += element + " / ";;
                // });
                // toast.update(toastPromiseRegister, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                // toast.warn('🦄 Wow so easy!', {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
            }
        } catch (error) {
            // if(data){

            // }
            // console.log("register error")
            // console.log(error)
            error.response.data.errors.forEach(element => {
                toastMessage += element + " / ";
            });
            toast.warn(toastMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // toast.update(toastPromiseRegister, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
        }
        //handle hide loading
        {
            const loadingState2 = { ...getState().loadingState }
            var removeProcessingItem = loadingState2.ProcessingDelay.filter(item => item != "coreUserData");
            loadingState2.ProcessingDelay = removeProcessingItem;
            loadingState2.canRequest = removeProcessingItem.length > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState2 })
        }
        await dispatch({ type: "CORE_USER", payload: state })
    }
}


export const changeRegisterCompleteCheck = (value) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.checkRegisterComplete = value;
        await dispatch({ type: "SET_REGISTER_COMPLETE_CHECK", payload: state })
    }
}


export const setAuth1Redux = (auth1) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.auth1 = auth1;
        handleNextInput(0)
        await dispatch({ type: "SET_AUTH", payload: state })
    }
}
export const setAuth2Redux = (auth2) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.auth2 = auth2;
        handleNextInput(4)
        await dispatch({ type: "SET_AUTH", payload: state })
    }
}
export const setAuth3Redux = (auth3) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.auth3 = auth3;
        handleNextInput(3)
        await dispatch({ type: "SET_AUTH", payload: state })
    }
}
export const setAuth4Redux = (auth4) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.auth4 = auth4;
        handleNextInput(2)
        await dispatch({ type: "SET_AUTH", payload: state })
    }
}
export const setImageProfRedux = (image) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.image = image;
        await dispatch({ type: "SET_IMAGE", payload: state })
    }
}
export const setNameRedux = (fullName) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.fullName = fullName;
        await dispatch({ type: "SET_NAME", payload: state })
    }
}

export const setEmailRedux = (email) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.email = email;
        await dispatch({ type: "SET_EMAIL", payload: state })
    }
}
export const setPasswordRedux = (password) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.password = password;
        await dispatch({ type: "SET_PASSWORD", payload: state })
    }
}

export const setPasswordConfirmRedux = (passwordConfirm) => {
    return async (dispatch, getState) => {
        let state = { ...getState().userState }
        state.passwordConfirm = passwordConfirm;
        await dispatch({ type: "SET_PASSWORD_CONFIRM", payload: state })
    }
}

// RESET STATE REDUX
export const resetStateRedux = () => {
    return async (dispatch) => {
        await dispatch({ type: "RESET_STATE" })
    }
}



// REGISTER USER
export const RegisterUserAction = () => {
    return async (dispatch, getState) => {
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }

        if (state.fullName && state.email && state.password && state.passwordConfirm) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail") && CheckFormat("password", state.password, "errRejesterPasswordConfirm") && CheckFormat("passwordConfirm", { pass1: state.password, pass2: state.passwordConfirm }, "errRejesterPasswordConfirm")) {
                // let toastPromiseRegister = toast.loading("درحال ارسال درخواست شما به سرور")


                //handle show loadin
                {
                    loadingState.ProcessingDelay.push("registerUser");
                    loadingState.canRequest = false;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                }


                let toastMessage = "";
                try {
                    let formdata = new FormData();
                    formdata.append("name", state.fullName)
                    formdata.append("email", state.email)
                    formdata.append("password", state.password)
                    formdata.append("password_confirmation", state.passwordConfirm)
                    // let register_user =async () => {
                    const { data, status } = await registerUser(formdata);

                    if (status == 200 && data.status == true) {

                        //handle show loadin
                        {
                            loadingState.ProcessingDelay.push("verifyEmail");
                            loadingState.canRequest = false;
                            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                        }

                        showToast("به خانواده بزرگ زانکو خوش آمدید", "success");
                        // toast.update(toastPromiseRegister, { render: "به خانواده بزرگ زانکو خوش آمدید", type: "success", isLoading: false, autoClose: 3000 })
                        // let toastPromiseSendCode = toast.loading("درحال ارسال درخواست شما به سرور")
                        state.email = state.email;
                        state.checkRegisterComplete = true;
                        // const navigate=useNavigate();
                        // navigate("/ValidateEmail")
                        // window.location.href = '/ValidateEmail';
                        // const history =useHistory()
                        // history.push("/ValidateEmail")
                        // let send_code_email = async () => {
                        await dispatch({ type: "REGISTER_USER", payload: state })
                        const { data, status } = await verifyEmail(formdata);
                        if (status == 200 && data.status == true) {
                            showToast("کد به ایمیل شما ارسال شد", "success");
                            // toast.update(toastPromiseSendCode, { render: "کد به ایمیل شما ارسال شد", type: "success", isLoading: false, autoClose: 3000 })
                            // return Promise.resolve();
                        } else {
                            // return Promise.reject();
                            data.errors.forEach(element => {
                                toastMessage += element + " / ";;
                            });
                            showToast(toastMessage, "error");
                            // toast.update(toastPromiseSendCode, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                        }
                        // }
                        // await dispatch({ type: "SEND_CODE_EMAIL", payload: state})
                        // showPromisToast(send_code_email(),"sendCod")
                        // return Promise.resolve()
                        // debugger
                    } else {
                        data.errors.forEach(element => {
                            toastMessage += element + " / ";;
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromiseRegister, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                        // return Promise.reject()
                    }
                } catch (error) {
                    // console.log("register error")
                    error.response.data.errors.forEach(element => {
                        // toastMessage += element+ "\r\n";
                        toastMessage += element + " / ";
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromiseRegister, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                }

                await dispatch({ type: "REGISTER_USER", payload: state })

            }

        } else {
            showInputErrorToast();
        }

        //handle hide loading
        {
            var firstFilter = loadingState.ProcessingDelay.filter(item => item != "registerUser");
            var removeProcessingItem = firstFilter.filter(item => item != "verifyEmail");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}


//LOGIN USER
export const loginUserAction = () => {
    return async (dispatch, getState) => {
        //  
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }


        if (state.email && state.password) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail") && CheckFormat("password", state.password, "errRejesterPassword")) {
                // let toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")


                //handle show loadin
                {
                    loadingState.ProcessingDelay.push("loginUser");
                    loadingState.canRequest = false;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                }


                let formdata = new FormData();
                formdata.append("email", state.email)
                formdata.append("password", state.password)

                let toastMessage = "";
                try {

                    const { data, status } = await loginUser(formdata);
                    state.checkRegisterComplete = false;
                    // debugger
                    // debugger
                    if (data.code === 200) {
                        localStorage.setItem("token", data.data.token);
                        // localStorage.setItem("userId", data.data.user.uuid);
                        // localStorage.setItem("user", json);
                        // debugger
                        // const d = new Date();
                        // d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
                        // let expires = "expires=" + d.toUTCString();
                        // document.cookie = "user_name=" + data.data.user.name + ";" + expires;
                        // document.cookie = "user_email=" + data.data.user.email + ";" + expires;
                        state.forceUpdate += 1;
                        // toast.update(toastPromise, { render: "با موفقیت وارد شدید", type: "success", isLoading: false, autoClose: 3000 })
                    } else if (data.code === 205) {


                        //handle show loadin
                        {
                            loadingState.ProcessingDelay.push("verifyEmail");
                            loadingState.canRequest = false;
                            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                        }
                        // debugger
                        // toast.update(toastPromise, { render: "با موفقیت وارد شدید", type: "success", isLoading: false, autoClose: 3000 })
                        // toast.update(toastPromise, { render: "لطفا ایمیل خود را تایید کنید", type: "success", isLoading: false, autoClose: 3000 }) //comment
                        // let toastPromiseSendCode = toast.loading("درحال ارسال درخواست شما به سرور")
                        // state.email = state.email;
                        state.checkRegisterComplete = true;
                        // let send_code_email = async () => {
                        let formdata1 = new FormData();
                        formdata1.append("email", state.email)
                        formdata1.append("password", state.password)
                        // debugger
                        const { data, status } = await verifyEmail(formdata1);
                        if (status == 200 && data.status == true) {
                            state.checkRegisterComplete = true;
                            // localStorage.setItem("token",data.data.token)
                            showToast("کد به ایمیل شما ارسال شد", "success");
                            // toast.update(toastPromiseSendCode, { render: "کد به ایمیل شما ارسال شد", type: "success", isLoading: false, autoClose: 3000 })
                            // return Promise.resolve();
                            await dispatch({ type: "SEND_CODE_EMAIL", payload: state })
                        } else {
                            // return Promise.reject();
                            data.errors.forEach(element => {
                                toastMessage += element + " / ";;
                            });
                            showToast(toastMessage, "error");
                            // toast.update(toastPromiseSendCode, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                        }

                        //handle hide loading
                        {
                            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "verifyEmail");
                            loadingState.ProcessingDelay = removeProcessingItem;
                            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
                            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                        }
                    }
                    // switch (data.code) {
                    //     case 200:
                    //         // Navigate("/dashboard");
                    //         // const json=JSON.parse(data.data.user)
                    //         localStorage.setItem("token", data.data.token);
                    //         // localStorage.setItem("userId", data.data.user.uuid);
                    //         // localStorage.setItem("user", json);
                    //         // debugger
                    //         const d = new Date();
                    //         d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
                    //         let expires = "expires=" + d.toUTCString();
                    //         document.cookie = "user_name=" + data.data.user.name + ";" + expires;
                    //         document.cookie = "user_email=" + data.data.user.email + ";" + expires;
                    //         state.forceUpdate += 1;
                    //         toast.update(toastPromise, { render: "با موفقیت وارد شدید", type: "success", isLoading: false, autoClose: 3000 })
                    //         break;

                    //         case 205:
                    //         toast.update(toastPromise, { render: "لطفا ایمیل خود را تایید کنید", type: "success", isLoading: false, autoClose: 3000 })
                    //         let toastPromiseSendCode = toast.loading("درحال ارسال درخواست شما به سرور")
                    //         // state.email = state.email;
                    //         state.checkRegisterComplete = true;
                    //         // let send_code_email = async () => {
                    //         let formdata1 = new FormData();
                    //         formdata1.append("email", state.email)
                    //         formdata1.append("password", state.password)
                    //         debugger
                    //         const { data, status } = await verifyEmail(formdata1);
                    //         if (status == 200 && data.status == true) {
                    //             state.checkRegisterComplete = true;
                    //             toast.update(toastPromiseSendCode, { render: "کد به ایمیل شما ارسال شد", type: "success", isLoading: false, autoClose: 3000 })
                    //             // return Promise.resolve();
                    //             await dispatch({ type: "SEND_CODE_EMAIL", payload: state })
                    //         }else {
                    //             // return Promise.reject();
                    //             data.errors.forEach(element => {
                    //                 toastMessage += element + " / ";;
                    //             });
                    //             toast.update(toastPromiseSendCode, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    //         }
                    //         break;

                    //     default:
                    //         break;
                    // }
                    if (!data.status && data.code != 205) {
                        data.errors.forEach(element => {
                            toastMessage += element + " / ";
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    }
                } catch (error) {
                    error.response.data.errors.forEach(element => {
                        toastMessage += element + " / ";
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                }
                await dispatch({ type: "LOGIN_USER", payload: state })
            }
        } else {
            showInputErrorToast();
        }

        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "loginUser");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}



//SEND EMAIL COD
export const sendCodEmailAction = (email, demoResolve) => {
    return async (dispatch, getState) => {
        // const toastPromiseSendCode = toast.loading("درحال ارسال درخواست شما به سرور")
        const toastMessage = "";
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }


        const internal_email = state.email;
        if (internal_email) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail")) {

                //handle show loadin
                {
                    loadingState.ProcessingDelay.push("verifyEmail");
                    loadingState.canRequest = false;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                }


                // let state = { ...getState().userState }
                let formdata = new FormData();
                formdata.append("email", internal_email)
                // let send_code_email = async () => {
                const { data, status } = await verifyEmail(formdata);

                if (status == 200 && data.status == true) {
                    // state.forgotPasswordStep=1;
                    await dispatch({ type: "SEND_CODE_EMAIL", payload: state })
                    showToast("کد به ایمیل شما ارسال شد", "success");
                    // toast.update(toastPromiseSendCode, { render: "کد به ایمیل شما ارسال شد", type: "success", isLoading: false, autoClose: 3000 })
                } else {
                    data.errors.forEach(element => {
                        toastMessage += element + " / ";;
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromiseSendCode, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    if (demoResolve && demoResolve == true) {
                        state.forgotPasswordStep = 1;
                        await dispatch({ type: "SEND_CODE_EMAIL", payload: state })
                        // return Promise.resolve()

                    } else {

                        // return Promise.reject();
                    }

                }
                // }
                // showPromisToast(send_code_email(), "sendCod")
            }
        }
        else {
            showInputErrorToast();
        }
        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "verifyEmail");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}


//CHECK EMAIL COD 
export const checkVerifyEmailAction = () => {
    return async (dispatch, getState) => {
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }

        const internal_email = state.email;
        const internal_auth1 = state.auth1;
        const internal_auth2 = state.auth2;
        const internal_auth3 = state.auth3;
        const internal_auth4 = state.auth4;


        if (internal_email && internal_auth1 && internal_auth2 && internal_auth3 && internal_auth4) {

            //handle show loadin
            {
                loadingState.ProcessingDelay.push("checkVerifyEmail");
                loadingState.canRequest = false;
                await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
            }


            // const toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")
            let toastMessage = "";
            try {
                const code = internal_auth1 + internal_auth2 + internal_auth3 + internal_auth4;
                let formdata = new FormData();
                formdata.append("code", code)
                formdata.append("email", internal_email)
                // let check_verify_email = async () => {
                const { data, status } = await checkVerifyEmail(formdata);
                //  
                if (status == 200 && data.status == true) {
                    state.forgotPasswordStep = 2;
                    state.checkVerifyRegister = true;
                    // toast.update(toastPromise, { render: "اعتبار سنجی ایمیل انجام شد", type: "success", isLoading: false, autoClose: 3000 })
                    // let toastPromise1 = toast.loading("درحال ارسال درخواست شما به سرور")
                    //login
                    let formdata_login = new FormData();
                    formdata_login.append("email", state.email)
                    formdata_login.append("password", state.password)
                    const { data, status } = await loginUser(formdata_login);
                    if (status == 200 && data.status == true) {

                        localStorage.setItem("token", data.data.token);
                        // const d = new Date();
                        // d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
                        // let expires = "expires=" + d.toUTCString();
                        // document.cookie = "user_name=" + data.data.user.name + ";" + expires;
                        // document.cookie = "user_email=" + data.data.user.email + ";" + expires;
                        state.forceUpdate += 1;
                        // toast.update(toastPromise1, { render: "با موفقیت وارد شدید", type: "success", isLoading: false, autoClose: 3000 })
                    } else {
                        data.errors.forEach(element => {
                            toastMessage += element + " / ";
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromise1, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    }


                    // return Promise.resolve();
                } else {
                    // return Promise.reject();
                    data.errors.forEach(element => {
                        toastMessage += element + " / ";
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                }
                // }
                // showPromisToast(check_verify_email(),"checkVerifyEmail")
            } catch (error) {
                error.response.data.errors.forEach(element => {
                    toastMessage += element + " / ";
                });
                showToast(toastMessage, "error");
                // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })

            }


            await dispatch({ type: "VERIFY_EMAIL", payload: state })
        }
        else {
            showInputErrorToast();
        }
        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "checkVerifyEmail");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}




//CHECK EMAIL COD 
export const checkVerifyEmailForgotPasswordAction = () => {
    return async (dispatch, getState) => {
        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }

        const internal_email = state.email;
        const internal_auth1 = state.auth1;
        const internal_auth2 = state.auth2;
        const internal_auth3 = state.auth3;
        const internal_auth4 = state.auth4;


        if (internal_email && internal_auth1 && internal_auth2 && internal_auth3 && internal_auth4) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail")) {
                //handle show loadin
                {
                    loadingState.ProcessingDelay.push("checkVerifyEmailChangePassword");
                    loadingState.canRequest = false;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                }
                // const toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")
                let toastMessage = "";
                try {
                    const code = internal_auth1 + internal_auth2 + internal_auth3 + internal_auth4;
                    let formdata = new FormData();
                    formdata.append("code", code)
                    formdata.append("email", internal_email)
                    // let check_verify_email = async () => {
                    const { data, status } = await checkVerifyEmailChangePassword(formdata);
                    //  
                    if (status == 200 && data.status == true) {
                        state.forgotPasswordStep = 2;
                        state.checkVerifyRegister = true;
                        // toast.update(toastPromise, { render: "اعتبار سنجی ایمیل انجام شد", type: "success", isLoading: false, autoClose: 3000 })
                        // return Promise.resolve();
                    } else {
                        // return Promise.reject();
                        data.errors.forEach(element => {
                            toastMessage += element + " / ";
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    }
                    // }
                    // showPromisToast(check_verify_email(),"checkVerifyEmail")
                } catch (error) {
                    error.response.data.errors.forEach(element => {
                        toastMessage += element + " / ";
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })

                }


                await dispatch({ type: "VERIFY_EMAIL_FORGOT_PASSWORD", payload: state })
            }
        }
        else {
            showInputErrorToast();
        }

        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "checkVerifyEmailChangePassword");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}


//SEND EMAIL COD FOR FORGOT PASSWORD SECTION
export const sendForgotPasswordEmailCodeAction = () => {
    return async (dispatch, getState) => {

        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }

        const stateEmail = state.email;

        if (stateEmail) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail")) {
                if (!state.handleResendCode == false) {

                    //handle show loadin
                    {
                        loadingState.ProcessingDelay.push("verifyEmailChangePassword");
                        loadingState.canRequest = false;
                        await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                    }
                    // const toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")

                    var toastMessage = "";
                    try {

                        let formdata = new FormData();
                        formdata.append("email", stateEmail)
                        const { data, status } = await verifyEmailChangePassword(formdata);
                        // let send_code_email_forgotPassword = async () => {
                        if (status == 200 && data.status == true) {
                            state.forgotPasswordStep = 1;
                            state.handleResendCode = false;
                            setTimeout(() => {
                                let state = { ...getState().userState }
                                state.handleResendCode = true;
                                dispatch({ type: "DISABLE_TIMER", payload: state })
                            }, 120000);
                            showToast("کد به ایمیل شما ارسال شد", "success");
                            // toast.update(toastPromise, { render: "کد به ایمیل شما ارسال شد", type: "success", isLoading: false, autoClose: 3000 })
                            await dispatch({ type: "SEND_CODE_EMAIL_FORGOTPASSWORD", payload: state })
                            // return Promise.resolve()
                        } else {
                            // return Promise.reject();
                            data.errors.forEach(element => {
                                toastMessage += element;
                            });
                            showToast(toastMessage, "error");
                            // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                        }
                        // }
                        //  
                        // const dd=data.error[0]
                        // showPromisToast(send_code_email_forgotPassword(),data.error[0])
                    } catch (error) {
                        // debugger
                        error.response.data.errors.forEach(element => {
                            toastMessage += element + ".";
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })

                    }

                    // showPromisToast(send_code_email_forgotPassword(),"sendCod")
                }
                else {
                    showInputErrorToast("کد قبلا ارسال شده");
                }
            }
        } else {
            showInputErrorToast();
        }
        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "verifyEmailChangePassword");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }
    }
}

// 
//CHANGE USER PASSWORD 
export const changePasswordAction = () => {
    return async (dispatch, getState) => {

        const state = { ...getState().userState }
        const loadingState = { ...getState().loadingState }


        const internal_email = state.email;
        const internal_auth1 = state.auth1;
        const internal_auth2 = state.auth2;
        const internal_auth3 = state.auth3;
        const internal_auth4 = state.auth4;
        const internal_password = state.password;
        const internal_password_confirmation = state.passwordConfirm;


        // const toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")

        const toastMessage = "";

        if (internal_email && internal_auth1 && internal_auth2 && internal_auth3 && internal_auth4 && internal_password && internal_password_confirmation) {
            if (CheckFormat("email", state.email, "errRejesterFormatEmail") && CheckFormat("password", state.password, "errRejesterPasswordConfirm") && CheckFormat("passwordConfirm", { pass1: state.password, pass2: state.passwordConfirm }, "errRejesterPasswordConfirm")) {


                //handle show loadin
                {
                    loadingState.ProcessingDelay.push("changePassword");
                    loadingState.canRequest = false;
                    await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
                }

                const code = internal_auth1 + internal_auth2 + internal_auth3 + internal_auth4;
                let formdata = new FormData();
                formdata.append("email", internal_email)
                formdata.append("password", internal_password)
                formdata.append("password_confirmation", internal_password_confirmation)
                formdata.append("code", code)
                try {
                    const { data, status } = await changePassword(formdata);

                    if (status == 200 && data.status == true) {
                        showToast("رمز عبور با موفقیت تغییر کرد", "success");
                        state.forceUpdate+=1;
                        state.handleResendCode=true;
                        state.forgotPasswordStep=0;
                        localStorage.setItem("CHECNGEPASSWORD_COMPLETE",true)
                        // toast.update(toastPromise, { render: "رمز عبور با موفقیت تغییر کرد", type: "success", isLoading: false, autoClose: 3000 })
                    } else {
                        data.errors.forEach(element => {
                            toastMessage += element;
                        });
                        showToast(toastMessage, "error");
                        // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                    }


                    await dispatch({ type: "CHANGE_PASSWORD", payload: state })
                } catch (error) {
                    error.response.data.errors.forEach(element => {
                        toastMessage += element;
                    });
                    showToast(toastMessage, "error");
                    // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                }
            }
        }
        else {
            showInputErrorToast();
        }
        //handle hide loading
        {
            var removeProcessingItem = loadingState.ProcessingDelay.filter(item => item != "changePassword");
            loadingState.ProcessingDelay = removeProcessingItem;
            loadingState.canRequest = removeProcessingItem > 0 ? false : true;
            await dispatch({ type: "SET_PROCESSING_DELAY", payload: loadingState })
        }

    }
}
export const logoutAction = () => {
    return async (dispatch, getState) => {
        // const toastPromise = toast.loading("درحال ارسال درخواست شما به سرور")

        const state = { ...getState().userState }

        localStorage.removeItem("token")
        state.userData = "";
        // document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        state.forceUpdate += 1;
        // toast.update(toastPromise, { render: "از حساب خود خارج شدید", type: "success", isLoading: false, autoClose: 3000 })
        await dispatch({ type: "RESET_ALL_STATE" })
        // await dispatch({ type: "LOG_OUT" })
    }
}
export const findUserAction = () => {
    return async (dispatch, getState) => {

        const state = { ...getState().userState }

        const internal_user = state.user;
        const token = localStorage.getItem("userId")

        // if (internal_user) {

        // }else{
        if (token != "undefined" && token != null) {

            try {
                const dd = await findUser(token);
                // debugger

                // if (status == 200 && data.status == true) {
                //     debugger
                //     console.log("find user")
                //     // toast.update(toastPromise, { render: "وارد حساب کاربری شدید", type: "success", isLoading: false, autoClose: 3000 })
                // } else {
                //     // data.errors.forEach(element => {
                //     //     toastMessage += element;
                //     // });
                //     // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                //     console.log(data.errors)
                // }

                await dispatch({ type: "FIND_USER", payload: state })

            } catch (error) {
                // error.response.data.errors.forEach(element => {
                //     toastMessage += element;
                // });
                // toast.update(toastPromise, { render: toastMessage, type: "error", isLoading: false, autoClose: 3000 })
                // console.log(error)
            }
        }

    }

    // }
}