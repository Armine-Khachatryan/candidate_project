import { useEffect, useState } from "react";
import s from "./Checkbox.module.css";
import roundedStyles from "./rounded.module.css";

export const Checkbox = ({
                             label,
                             disabled = false,
                             onChange = () => {},
                             name,
                             rounded = false,
                             className,
                             checked,
                             defaultChecked,
                             ...props
                         }) => {
    const [value, setValue] = useState(checked);

    useEffect(() => {
        setValue(checked);
    }, [checked]);

    if (rounded) {
        return (
            <label className={[roundedStyles.label, className].join(" ")}>
                <input
                    type="checkbox"
                    onChange={onChange}
                    name={name}
                    checked={value}
                    defaultChecked={defaultChecked}
                    {...props}
                />
                <div className={roundedStyles.block}>
                    <span className={roundedStyles.checkmark_container}>
                        <span />
                    </span>
                </div>
                {label}
            </label>
        );
    }

    return (
        <div className={s.container}>
            <label
                className={[
                    s["form-control"],
                    disabled ? s["form-control--disabled"] : "",
                    rounded ? s["checkbox-round"] : "",
                    className,
                ].join(" ")}
            >
                <input
                    type="checkbox"
                    name={name}
                    checked={value}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={(e) => onChange(e)}
                    {...props}
                />
                <span>{label} </span>
            </label>
        </div>
    );
};
