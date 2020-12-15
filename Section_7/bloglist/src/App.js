import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedInNotification from './components/LoggedInNotification'
import Menu from './components/Menu'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { getBlogs } from './reducers/blogReducer'
import { stayIn } from './reducers/userReducer'
import blogService from './services/blogs'
import { Route, Switch } from 'react-router-dom'
import UsersList from './components/UsersList'

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

    return (
        <div>
            <h1>Bloglist app</h1>
            <Notification />
            {
                user ?
                    <Fragment>
                        <LoggedInNotification />
                        <Togglable buttonLabel='create new blog'>
                            <NewBlogForm />
                        </Togglable>
                        <Menu />
                        <Switch>
                            <Route exact path='/'>
                                <BlogList />
                            </Route>
                            <Route path='/users'>
                                <UsersList />
                            </Route>
                        </Switch>
                    </Fragment> : <LoginForm />
            }
        </div>
    )
}

export default App