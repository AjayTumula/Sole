import React from "react";
import './button.scss';


const Button = ({text, onClick, children, className, ...rest}) => {
    return (
        <button className={`ecw-button ${className}`} onClick={onClick} {...rest} >
            {children}
        </button>
    )
}

export default Button;