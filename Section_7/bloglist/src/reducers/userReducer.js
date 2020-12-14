import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return state = action.data

        case 'STAY_IN':
            return state = action.data

        case 'LOGOUT':
            return state = null

        default:
            return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login({
                username: credentials.username,
                password: credentials.password
            })
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            dispatch({
                type: 'LOGIN',
                data: loggedUser
            })
        } catch (error) {
            dispatch(setNotification('error', 'Invalid username or password', 5))
        }
    }
}

export const stayIn = (loggedUser) => {
    return async dispatch => {
        dispatch({
            type: 'STAY_IN',
            data: loggedUser
        })
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('loggedUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer