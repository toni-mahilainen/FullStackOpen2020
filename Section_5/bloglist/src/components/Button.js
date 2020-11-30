import React from 'react'

const Button = ({ style, type, text, onClick }) => (
    <button style={style} type={type} onClick={onClick}>{text}</button>
)

export default Button
