import React from "react";
import s from './NewButton.module.css';
import {NavLink} from "react-router-dom";
import MinLoader from "../MinLoader/MinLoader";

export const NewButton = React.forwardRef(
    (
        {
            label = "",
            className = "",
            children,
            activeClass = "",
            onClick = () => {
            },
            disabled = false,
            variant = "",
            size = "normal",
            link,
            style,
            isLoading=false,
            ...props
        },
        ref
    ) => {
        if (link) {
            return (
                <NavLink
                    to={link}
                    className={({isActive}) =>
                        ` ${s.container} ${className}  ${variant && s['container_' + variant]} ${isActive ? activeClass : ""}`
                    }
                    onClick={onClick}
                    disabled={disabled}
                    style={style}
                    {...props}
                >
                    {label}
                    {children}
                </NavLink>
            );
        }

        return (
            <button
                ref={ref}
                className={
                    `${s.container} ${variant && s['container_' + variant]} ${className}`
                }
                onClick={(e) => {
                    disabled ? e.preventDefault() : onClick && onClick(e);
                }}
                {...props}
                disabled={disabled}
                style={style}
            >
                {label}
                {children}
                {isLoading && <MinLoader/>}
            </button>
        );
    }
);
