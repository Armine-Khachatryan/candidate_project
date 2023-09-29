import React, {useEffect, useState} from "react";
import axios from "axios";
import config from '../../../config';
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";
import {useNavigate, useSearchParams} from "react-router-dom";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";
import classes from './NewPassword.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";



function NewPassword(){
    let [searchParams] = useSearchParams();
    let [showForm, setShowForm]=useState(false);
    let [newCode, setNewCode]=useState(null)

    const navigate=useNavigate();
    const {isPassword}=useValidation();
    const [isLoading, setIsLoading] = useState(true);
    // const [code, setCode]=useState(null)

    useEffect(()=>{
        let code= searchParams.get('code');
        checkCode(code)
    }, []);



    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        togglePassword: passwordShowHandler,
        passwordShown: passwordShow,
        reset: resetPassword,
        showPassFalse:showPassFalse,
        isTouched: passwordIsTouched
    } = useInput(isPassword);

    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        togglePassword: confirmPasswordShowHandler,
        passwordShown: confirmPasswordShow,
        reset: resetConfirmPassword,
        isTouched: confirmPasswordIsTouched
    } = useInput(isPassword);

    let hasError = false;
    let confirmPasswordMessage=null;
    if(password !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }

    let formIsValid = false;
    if (passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
    }


    const checkCode = async (code) => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('code', code);
        setIsLoading(true);
        try {
            let response = await axios.post(`${config.baseUrl}api/password/code/check`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false);
            setShowForm(true);
            setNewCode(response.data.data.code)
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }



    const postChangePassword = async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('code', newCode);
        formData.append('password', password);
        formData.append('password_confirmation',confirmPasswordValue);
        try {
            let response = await axios.post(`${config.baseUrl}api/password/reset`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false);
            navigate('/login')
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }


    const submitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
         postChangePassword();
         resetPassword();
         resetConfirmPassword()
         showPassFalse()
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    if (isLoading) return <Loader/>;


    return (
        <>
        {showForm  ?
            <div className="whole">
                <div>
                    <Header/>
                        <div className="wholeLogin">
                            <div className="loginInside">
                                <div className="title">Establecer nueva contraseña</div>
                                <form onSubmit={submitHandler} style={{maxWidth:'560px', width:"100%"}}>
                                    <Input
                                        hasError={passwordHasError}
                                        errorText="Please enter password. (Minimum eight characters, at least one uppercase letter,
                                         one lowercase letter, one number and one special character)"
                                        onClick={passwordShowHandler}
                                        image= {passwordShow ? EyeImage : ClosedEye}
                                        input={{
                                            maxWidth:"560px",
                                            width: "100%",
                                            value: password,
                                            placeholder: "Establecer nueva contraseña",
                                            type: passwordShow ? "text" : "password",
                                            onChange: passwordChangeHandler,
                                            onBlur: passwordBlurHandler,
                                        }}
                                    />
                                    <Input
                                        hasError={hasError && confirmPasswordIsTouched}
                                        errorText={confirmPasswordMessage}
                                        onClick={confirmPasswordShowHandler}
                                        image ={confirmPasswordShow ? EyeImage : ClosedEye}
                                        input={{
                                            maxWidth:"560px",
                                            width: "100%",
                                            value: confirmPasswordValue,
                                            placeholder: "Reemplazar nueva contraseña",
                                            type: confirmPasswordShow ? "text" : "password",
                                            onChange: confirmPasswordChangeHandler,
                                            onBlur: confirmPasswordBlurHandler,
                                            onKeyPress: handleKeyPress
                                        }}
                                    />
                                    <button className={classes.newPasswordBtn} type={"submit"}>Iniciar sesión</button>
                                </form>
                            </div>
                        </div>
                    </div>
                <Footer/>
                </div>
            : null}
        </>
    )
}


export default NewPassword;