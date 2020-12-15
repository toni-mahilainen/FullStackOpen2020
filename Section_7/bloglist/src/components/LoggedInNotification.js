import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Button from './Button'

const LoggedInNotification = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogOut = (e) => {
        e.preventDefault()

        dispatch(logout())
    }

    return (
        <div>
            <Button id='logoutBtn' type='button' text='log out' onClick={handleLogOut} />
            <p>{user.name} logged in</p>
        </div>
    )
}

export default LoggedInNotification