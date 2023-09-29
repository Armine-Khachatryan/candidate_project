import React, { useState, useEffect} from "react";
import Modal from 'react-modal';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import Input from "../../UI/Input/Input";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";
import Button from "../../UI/Button/Button";
import classes from '../../components/ImageViewModal/ImageViewModal.module.css';
import {useNavigate} from "react-router-dom";


function ChangePasswordModal(props) {

    const [isLoading, setIsLoading] = useState(false);
    const {isPassword}=useValidation();


    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '624px',
            width: '100%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            borderRadius: '8px',
        },
        overlay: {zIndex: 1000}
    };

    const {
        value: oldPassword,
        isValid: oldPasswordIsValid,
        hasError: oldPasswordHasError,
        valueChangeHandler: oldPasswordChangeHandler,
        inputBlurHandler:oldPasswordBlurHandler,
        togglePassword: oldPasswordShowHandler,
        passwordShown: oldPasswordShow,
        reset: resetOldPassword,
        showPassFalse:showOldPassFalse,
        isTouched: oldPasswordIsTouched
    } = useInput(isPassword);

    const {
        value: newPassword,
        isValid: newPasswordIsValid,
        hasError: newPasswordHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
        togglePassword: newPasswordShowHandler,
        passwordShown: newPasswordShow,
        reset: resetNewPassword,
        showPassFalse:showNewPassFalse,
        isTouched: newPasswordIsTouched
    } = useInput(isPassword);

    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        togglePassword: confirmPasswordShowHandler,
        passwordShown: confirmPasswordShow,
        reset: resetConfirmPassword,
        showPassFalse: showConfirmPasswordFalse,
        isTouched: confirmPasswordIsTouched
    } = useInput(isPassword);


    let hasErrorForNewPassword = false;
    let newPasswordMessage =null;
    if(oldPassword === newPassword  && oldPassword!=="" && newPassword!==""){
        hasErrorForNewPassword = true;
        newPasswordMessage = "Passwords should not match"
    }

    let hasError = false;
    let confirmPasswordMessage=null;
    if(newPassword !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }


    let formIsValid = false;
    if (oldPasswordIsValid && newPasswordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
    }

    function closeAndResetChangePasswordModal (){
        props.closeChangePasswordModal();
        resetOldPassword()
        resetNewPassword();
        resetConfirmPassword();
        showOldPassFalse();
        showNewPassFalse();
        showConfirmPasswordFalse();
    }

    const postChangePassword = async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('current_password', oldPassword);
        formData.append('password', newPassword);
        formData.append('password_confirmation', confirmPasswordValue);
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/my-profile/change-password`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false);
            if(response.data.message ==="Password changed successfully."){
                closeAndResetChangePasswordModal();
                toast.success("Password changed successfully.");
                props.onSetShowEditable(false)
            }
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.error || "Something went wrong."
            )
        }
    }


    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await postChangePassword();
        resetOldPassword()
        resetNewPassword();
        resetConfirmPassword();
        showOldPassFalse();
        showNewPassFalse();
        showConfirmPasswordFalse()
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }
    if (isLoading) return <Loader/>;

    return (
        <>
            <Modal
                isOpen={props.changePasswordModalIsOpen}
                onRequestClose={closeAndResetChangePasswordModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.modalInside}>
                    <div className={classes.closingModal}>
                        <div className={classes.modalTitle}>Change Password</div>
                        <div style={{display: "flex"}}>
                            <div onClick={closeAndResetChangePasswordModal}>
                                <img className={classes.closeModalImg} src={CloseIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={submitHandler}>
                        <Input
                            hasError={oldPasswordHasError}
                            errorText="Please enter valid password."
                            onClick={oldPasswordShowHandler}
                            image= {oldPasswordShow ? EyeImage : ClosedEye}
                            input={{
                                // maxWidth:"560px",
                                width: "100%",
                                value: oldPassword,
                                placeholder: "Escriba la contraseña antigua",
                                type: oldPasswordShow ? "text" : "password",
                                onChange: oldPasswordChangeHandler,
                                onBlur: oldPasswordBlurHandler,
                            }}
                        />
                        <Input
                            // hasError={newPasswordHasError}
                            hasError={hasErrorForNewPassword && newPasswordIsTouched ||newPasswordHasError}
                            errorText={newPasswordMessage || "Please enter valid password."}
                            onClick={newPasswordShowHandler}
                            image= {newPasswordShow ? EyeImage : ClosedEye}
                            input={{
                                // maxWidth:"560px",
                                width: "100%",
                                value: newPassword,
                                placeholder: "Escribe una nueva contraseña",
                                type: newPasswordShow ? "text" : "password",
                                onChange: newPasswordChangeHandler,
                                onBlur: newPasswordBlurHandler,
                            }}
                        />
                        <Input
                            // hasError = {hasError && confirmPasswordIsTouched}
                            hasError = {hasError && confirmPasswordIsTouched || confirmPasswordHasError}
                            errorText={confirmPasswordMessage || "Please enter valid password."}
                            onClick={confirmPasswordShowHandler}
                            image= {confirmPasswordShow ? EyeImage : ClosedEye}
                            input={{
                                // maxWidth:"560px",
                                width: "100%",
                                value: confirmPasswordValue,
                                placeholder: "Reemplazar nueva contraseña",
                                type: confirmPasswordShow ? "text" : "password",
                                onChange: confirmPasswordChangeHandler,
                                onBlur: confirmPasswordBlurHandler,
                                onKeyPress:handleKeyPress
                            }}
                        />
                        <Button width={"100%"} type={"submit"}>Save</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ChangePasswordModal;

