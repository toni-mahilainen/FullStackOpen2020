import React from 'react'

const Button = ({ id, style, type, text, onClick }) => (
    <button id={id} style={style} type={type} onClick={onClick}>{text}</button>
)

export default Button