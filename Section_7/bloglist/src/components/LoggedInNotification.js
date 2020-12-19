import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Button from './Button'
import './LoggedInNotification.css'

const LoggedInNotification = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogOut = (e) => {
        e.preventDefault()

        dispatch(logout())
    }

    return (
        <div className='logged-in-notification'>
        <p>{user.name} logged in</p>
        <Button id='logoutBtn' type='button' text='log out' onClick={handleLogOut} />
        </div>
    )
}

export default LoggedInNotification