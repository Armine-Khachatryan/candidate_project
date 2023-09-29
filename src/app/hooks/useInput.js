import React, {useState} from 'react';


const useInput = (validateValue) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword  = () => {
        setPasswordShown(prevShowPassword =>!prevShowPassword);
    };

    const showPassFalse =()=>{
        setPasswordShown(false)
    }

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        if ( +event.target.value <= +event.target.max && +event.target.value >= +event.target.min
            || event.target.value === ''
        ) {
            setEnteredValue(event.target.value);
            setIsTouched(true);
        } else if (!event.target.min && !event.target.max ) {
            setEnteredValue(event.target.value);
            setIsTouched(true)
        }
    };

    const inputBlurHandler = (event) => {
        setEnteredValue(event.target.value);
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        isTouched,
        togglePassword,
        passwordShown,
        showPassFalse,
    };
};

export default useInput;