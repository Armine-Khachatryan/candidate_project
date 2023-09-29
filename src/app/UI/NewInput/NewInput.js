import React, {useTransition, useLayoutEffect, useState, useRef} from "react";
import s from './NewInput.module.css';
import NewIcon from "../NewIcon/NewIcon";
// import {Icon} from "../index";

let doneTypingInterval = 260;

const regex = {
    //min 8 character, 1 number, 1 UPPERCASE, 1 lowercase, 1 special character
    password: {
        validation: new RegExp(
            // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$.!%*?&])[A-Za-z\\d@$!.%*?&]{8,}$"
         // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.]{8,}$"
        ),
        errorMessage:
            "Password must be at least 8 characters long, contains 1 UPPERCASE 1 lowercase 1 special charecter.",
    },
    // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    email: {
        validation: new RegExp(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])(?:[A-z])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|mail|ru)\\b"
        ),
        errorMessage: "Invalid email.",
    },
    phone: {
        validation: new RegExp(
            /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        ),
        errorMessage: "Invalid phone number.",
    },
    card: {
        validation: new RegExp(
            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"
        ),
        errorMessage: "Invalid card number.",
    },
    expDate: {
        validation: new RegExp("^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$"),
        errorMessage: "Invalid expiry date.",
    },
    CVV: {
        validation: new RegExp("^[0-9]{3,4}$"),
        errorMessage: "Invalid CVV",
    },
    cardholder: {
        validation: new RegExp("^[a-zA-Z]+ [a-zA-Z]+$"),
        errorMessage: "Invalid name.",
    },
    postalCode: {
        validation: new RegExp("^[0-9]{5}(-[0-9]{4})?$"), // USPOSTAL CODE
        errorMessage: "Invalid postal code.",
    },
};

const validateField = (fieldName, text) =>
    regex[fieldName].validation.test(text);

export const NewInput = ({
                          type = "text",
                          name,
                          placeholder,
                          onFinish,
                          className = "",
                          value = "",
                          label,
                          errorMassage = null,
                          onChange,
                             hasError = false,
                          validationKey,
                          margin = "",
                          padding = "",
                          frontIcon = <></>,
                          buttons = [],
                          buttonsArgs = {},
                          min,
                          max,
                          ...props
                      }) => {
    const [visibility, setVisibility] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [defaultValue, setDefaultValue] = useState(
        min !== undefined ? min : value
    );
    const [pending, startTransition] = useTransition();
    const  typingTimer = useRef(undefined); //timer identifier

    useLayoutEffect(() => setDefaultValue(value), [value]);

    useLayoutEffect(() => {
        if (validationKey && defaultValue) {
            setIsValid(validateField(validationKey, defaultValue));
        }
        setIsValid(true);
    }, []);
    const onTextChange = (e) => {
        let text;

        if (type === "number") {
            text = e.target.value;
            if (min !== undefined) {
                if (min >= 0) {
                    if (+e.target.value <= min) {
                        e.target.value = min;
                        text = e.target.value;
                    }
                    e.target.value =
                        +e.target.value > 0
                            ? Math.abs(+e.target.value).toString()
                            : "";
                }
                text = e.target.value;
            }
            if (max !== undefined) {
                if (+e.target.value >= max) {
                    e.target.value = max.toString();
                    text = e.target.value;
                    e.stopPropagation();
                }
            }
        } else {
            text = e.target.value;
        }
        setDefaultValue(text || "");
        if (onFinish) {
            clearTimeout(typingTimer.current);
            typingTimer.current = undefined
            if (text) {
                if (validationKey) {
                    const _isValid = validateField(validationKey, text);
                    setIsValid(_isValid);

                    return (typingTimer.current = setTimeout(
                        () => onFinish(e, label, _isValid),
                        doneTypingInterval
                    ));
                }else{
                    return (typingTimer.current = setTimeout(
                        () =>   onFinish(e, label),
                        doneTypingInterval
                    ));
                }
            }

        }

        if (validationKey) {
            const _isValid = validateField(validationKey, text);
            startTransition(() => {
                if (pending) {
                    setIsValid(_isValid);
                    if (_isValid) {
                        return onChange && onChange(e, label, _isValid);
                    } else {
                        return (
                            onChange &&
                            onChange({
                                target: {
                                    name: e.target.name,
                                    value: false,
                                },
                            })
                        );
                    }
                }
            });
        }
        return onChange && onChange(e, label);
    };

    if (type === "textarea") {
        return (
            <label className={[className].join(" ")}>
                {label && <div className={s.label}>{label}</div>}
                <textarea
                    className={[s.container, s.textarea].join(" ")}
                    name={name}
                    placeholder={placeholder}
                    rows={8}
                    onChange={(e) => onTextChange(e)}
                    {...props}
                />
            </label>
        );
    }

    if (type === "file") {
        return (
            <label className={s.label_container}>
                <div className={[s.container, className].join(" ")}>
                    {placeholder}
                    <input
                        type="file"
                        onChange={(e) => onTextChange(e)}
                        {...props}
                    />
                </div>
            </label>
        );
    }
    const buttonsWithProps = React.Children.map(buttons, (child) => {
        const _props = {
            onClick: () => child.props.onClick({
                value: defaultValue,
                setValue: setDefaultValue,
                isValid,
            })
        }
        if (React.isValidElement(child)) {
            return React.cloneElement(child, _props);
        }
        return child;
    });

    return (
        <div style={{margin, padding, flex: 1, width: "auto"}}>
            <label className={s.label_container}>
                {label && <div className={s.label}>{label}</div>}
                <div className={`${!hasError ? [s.container, className].join(" "):s.invalid}`}>
                    {frontIcon}
                    <input
                        type={
                            type === "password"
                                ? visibility
                                    ? "text"
                                    : "password"
                                : type
                        }
                        className={[s.input].join(" ")}
                        placeholder={placeholder}
                        name={name}
                        onChange={(e) => onTextChange(e)}
                        min={min}
                        max={max}
                        value={defaultValue}
                        {...props}
                    />
                    {type === "password" && (
                        <span onClick={() => setVisibility(!visibility)}>
                            <NewIcon
                                type={visibility ? "EyeOn" : "EyeOff"}
                                color={"#94A3B8"}
                                feather={true}
                            />
                        </span>
                    )}
                    {buttons && buttonsWithProps}
                </div>
            </label>
            {/*{validationKey && !isValid && (*/}
                {hasError && (
                <div className={["error_text", s.error].join(" ")}>
                    {/*{errorMassage !== undefined || regex[validationKey].errorMessage}*/}
                    {errorMassage}
                </div>
            )}
        </div>
    );
};
