import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const handleLogin = async (e) => {
        e.preventDefault()

        const credentials = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        dispatch(login(credentials))
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        id="username"
                        type="text"
                        name='username'
                        placeholder='Username'
                    />
                </div>
                <div>
                    <input
                        id="password"
                        type="password"
                        name='password'
                        placeholder='Password'
                    />
                </div>
                <button id="loginBtn" type="submit" >login</button>
            </form>
        </div>
    )
}

export default LoginForm