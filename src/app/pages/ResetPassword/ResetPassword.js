import React, {useState} from "react";
import axios from "axios";
import config from '../../../config';
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";
import classes from './ResetPassword.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";




function ResetPassword (props){

    const navigate=useNavigate();
    const {isEmail}=useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const [showSend, setShowSend]=useState(false);

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isTouched:emailIsTouched,
    } = useInput(isEmail);

    let emailMessage =null;
    if(!email){
        emailMessage = "Email is required";
    }
    else if (!emailIsValid){
        emailMessage = "Invalid email";
    }

    let formIsValid = false;
    if (emailIsValid) {
        formIsValid = true;
    }


    let postReset = async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('email', email);
        setIsLoading(true);
        try {
            let response = await axios.post(`${config.baseUrl}api/password/email`, formData, {
               headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    //         navigate('/companies/created');
            setIsLoading(false);
            setShowSend(true)
            // sessionStorage.setItem('code', response.data.user.role);
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
        postReset();
        resetEmail();
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    if (isLoading) return <Loader/>;


    return(
        <div className="whole">
            <div>
                <Header/>
                    <div className="wholeLogin">
                        <div className="loginInside">
                            <div className="title">Restablecer la contraseña</div>
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
                                        onBlur: emailBlurHandler,
                                        onKeyPress: handleKeyPress
                                    }}
                                />
                                <div> {
                                    !showSend ?
                                    <button className={classes.firstButton} type={"submit"}>Envía el enlace a mi correo electrónico.</button>
                                        : <div className={classes.sendText}>Por favor revise su correo electrónico!</div>
                                }
                                    <button className={classes.secondBtn} type={"submit"}>Reenviar el enlace</button>
                                </div>
                                <div className={classes.backToSign} onClick={()=>navigate('/login')}>Volver para iniciar sesión</div>
                            </form>
                        </div>
                    </div>
            </div>
        <Footer/>
        </div>
    )
}


export default ResetPassword;
