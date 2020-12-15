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
import { getUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import { Route, Switch } from 'react-router-dom'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.sort((obj1, obj2) => obj2.likes - obj1.likes))
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getBlogs())
        dispatch(getUsers())
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
                            <Route path='/users/:id'>
                                <UserInfo users={users} />
                            </Route>
                            <Route path='/users'>
                                <UsersList users={users} />
                            </Route>
                            <Route path='/blogs/:id'>
                                <BlogInfo blogs={blogs} user={user} />
                            </Route>
                            <Route path='/'>
                                <BlogList blogs={blogs} user={user} />
                            </Route>
                        </Switch>
                    </Fragment> : <LoginForm />
            }
        </div>
    )
}

export default App