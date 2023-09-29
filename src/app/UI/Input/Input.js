import React from "react";
import classes from './Input.module.css';


function Input (props) {



    return (
        <div className={classes.control}>
            {props.label && <label htmlFor={props.input.id} style={{color: props.color}} >{props.label}
                <span className={classes.redOne}>
                {props.red}</span></label>}
            <div className={classes.inputDiv}>
                <input
                    style={{width: props.width, maxWidth: props.maxWidth}}
                    className={`${props.hasError || props.error? classes.invalid: ""}`}
                    {...props.input}
                />
                <img src={props.image} onClick={props.onClick}/>
            </div>
            {props.hasError && <div className={classes.textDanger}>{props.errorText}</div>}
        </div>

    )
}

export default Input;