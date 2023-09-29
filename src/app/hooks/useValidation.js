import React from "react";


const regExpName = /([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*/;
const regExpEmail = /\w+(\.|-|_)?\w+@\w+\.\w{2,3}/ ;
// const regExpPass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const regExpPass =  /^[A-Za-z\d@$!%*?&.]{8,}$/;
const isName = value => regExpName.test(value);
const isEmail = value => regExpEmail.test(value);
const isPassword = value => regExpPass.test(value);
const isNotEmpty = value => value.trim() !== '';

const useValidation = () => {

    return {
        isName,
        isEmail,
        isPassword,
        isNotEmpty,
    }
}

export default useValidation;