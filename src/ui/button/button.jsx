import React from "react";
import './button.scss';


const Button = ({text, onClick, children, className, disabled = false, ...rest}) => {
    return (
        <button className={`ecw-button ${className}`} disabled={disabled} onClick={onClick} {...rest} >
            {children}
        </button>
    )
}

export default Button;