import React, {useState,useEffect} from "react";
import axios from "axios";
import config from '../../../config';
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import EyeImage from '../../assets/images/EyeImage.png';
import ClosedEye from '../../assets/images/ClosedEye.png';
import classes from './Login.module.css';
import {useNavigate} from "react-router-dom";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {setUserData} from "../../features/User/UserSlice";
import {useDispatch} from "react-redux";


function Login(props){


    const navigate=useNavigate();
    const {isNotEmpty, isEmail}=useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch=useDispatch();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isTouched:emailIsTouched,
    } = useInput(isEmail);

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
    } = useInput(isNotEmpty);

    let emailMessage =null;
    if(!email){
        emailMessage = "Email is required";
    }
    else if (!emailIsValid){
        emailMessage = "Invalid email";
    }


    let formIsValid = false;
    if (emailIsValid
        && passwordIsValid
    ) {
        formIsValid = true;
    }


    const values = {
        email,
        password,
    }

    // useEffect(() => {
    //     let config = {
    //         method: 'post',
    //         url: 'https://id6123.freelancedeveloper.site/api/auth/login?email=superadmin@gmail.com&password=secret123',
    //         headers: { }
    //
    //     };
    //
    //     axios.request(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //
    // }, [])


    let postLogin = async (values) => {
        let formData = new FormData();
        formData = {
            email: values.email,
            password: values.password,
        }
        setIsLoading(true);
        try {
            // let response = await axios.post(`https://id6123.freelancedeveloper.site/api/auth/login?email=superadmin@gmail.com&password=secret123`);
            // console.log(response);
            let response = await axios.post(`${config.baseUrl}api/auth/login`, formData);
            sessionStorage.setItem('token', response.data.token);
            props.setAccessToken(sessionStorage.getItem('token'));
            sessionStorage.setItem('role', response.data.role);
            props.setRole(sessionStorage.getItem('role'));
            setIsLoading(false);
            if(response.data.role ==="superadmin"){
                navigate('/companies/created');
            }
            if(response.data.role ==="candidate"){
                navigate('/indicators');
                dispatch(setUserData(response.data.user))
            }
            // dispatch(setUserData(response.data.user));
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong."
            )
        }
    }

    const submitHandler =   event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
         postLogin(values);
         resetEmail();
         resetPassword();
         showPassFalse()
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    if (isLoading) return <Loader/>;



    return(
        <>
            <div className="whole">
                <div>
                    <Header/>
                    <div className="wholeLogin">
                        <div className="loginInside">
                            <div className="title">Iniciar sesión</div>
                            <form onSubmit={submitHandler} style={{maxWidth:'560px', width:"100%"}}>
                                <Input
                                    hasError = {emailHasError}
                                    errorText={emailMessage}
                                    input={{
                                        maxWidth:"560px",
                                        value: email,
                                        placeholder: "Correo electrónico",
                                        type: "email",
                                        onChange: emailChangeHandler,
                                        onBlur: emailBlurHandler
                                    }}
                                />
                                <Input
                                    hasError={passwordHasError}
                                    errorText="Please enter valid password."
                                    onClick={passwordShowHandler}
                                    image= {passwordShow ? EyeImage : ClosedEye}
                                    input={{
                                        maxWidth:"560px",
                                        width: "100%",
                                        value: password,
                                        placeholder: "Contraseña",
                                        type: passwordShow ? "text" : "password",
                                        onChange: passwordChangeHandler,
                                        onBlur: passwordBlurHandler,
                                        onKeyPress: handleKeyPress
                                    }}
                                />
                                <div className={classes.buttonsDiv}>
                                    <div className={classes.forgot} onClick={()=> navigate('/reset-password')}>
                                        Has olvidado tu contraseña?
                                    </div>
                                    <div className={classes.signIn}>No tienes cuenta?
                                        <span className={classes.signInSpan} onClick={()=>navigate('/signup')}>Inscribirse</span>
                                    </div>
                                </div>
                                <button className={classes.loginBtn} type={"submit"}>Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>

    )
}


export default Login;


