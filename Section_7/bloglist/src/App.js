import React, { useEffect, Fragment } from 'react'
import './App.css'
import Button from './components/Button'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { getBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { login, logout, stayIn } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        if (loggedUser) {
            blogService.setToken(loggedUser.token)
            dispatch(stayIn(loggedUser))
        }
    }, [dispatch])

    const handleLogin = async (e) => {
        e.preventDefault()

        const credentials = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        dispatch(login(credentials))
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        
        dispatch(logout())
    }

    const loginForm = () => {
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

    const newBlogForm = () => {
        return (
            <Togglable buttonLabel='create new blog'>
                <NewBlogForm />
            </Togglable>
        )
    }
    return (
        <div>
            <h1>Bloglist app</h1>
            <Notification />
            {
                user ?
                    <Fragment>
                        <div>
                            <Button id='logoutBtn' type='button' text='log out' onClick={handleLogOut} />
                            <p>{user.name} logged in</p>
                        </div>
                        {newBlogForm()}
                        <BlogList user={user}/>
                    </Fragment>
                    : loginForm()
            }
        </div>
    )
}

export default App