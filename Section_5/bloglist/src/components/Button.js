import React from 'react'

const Button = ({ id, className, style, type, text, onClick }) => (
    <button id={id} className={className} style={style} type={type} onClick={onClick}>{text}</button>
)

export default Button