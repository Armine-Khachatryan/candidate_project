import React from "react";
import * as I from "../../assets/icons";

export const NewIcon = ({
                         type,
                         fill,
                         color,
                         size = 18,
                         feather = false,
                         className = "",
                         ...props
                     }) => {
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (!type) {
        return "invalid <Icon/> type";
    }

    const Custom = I[type];

    if (fill) {
        return (
            <Custom
                className={className}
                width={size}
                height={size}
                fill={fill}
                stroke={color}
                {...props}
            />
        );
    }

    return (
        <Custom
            className={className}
            width={size}
            height={size}
            stroke={color}
            {...props}
        />
    );
};

export default NewIcon;
