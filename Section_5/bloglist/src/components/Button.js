import React from 'react'

const Button = ({ type, text, onClick }) => (
    <button type={type} onClick={onClick}>{text}</button>
)

export default Button
