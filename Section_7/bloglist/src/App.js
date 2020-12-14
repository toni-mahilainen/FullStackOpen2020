import React, { useState, useEffect, Fragment } from 'react'
import './App.css'
import Blog from './components/Blog'
import Button from './components/Button'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification, hideNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        getBlogs()
    }, [])

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        if (loggedUser) {
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    const getBlogs = async () => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((obj1, obj2) => obj2.likes - obj1.likes)
        setBlogs(sortedBlogs)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const loggedUser = await loginService.login({
                username, password
            })
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            setUser(loggedUser)
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(setNotification('error', 'Invalid username or password'))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        }
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const addNewBlog = async (blogObj) => {
        try {
            const addedBlog = await blogService.create(blogObj)
            setBlogs(blogs.concat(addedBlog))

            dispatch(setNotification('success', `a new blog "${addedBlog.title}" by ${addedBlog.author} added`))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while adding a new blog'))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        }
    }

    const updateBlog = async (id, newBlogObj) => {
        const blogsCopy = [...blogs]
        const updatedBlog = await blogService.update(id, newBlogObj)
        const updatedBlogIndex = blogsCopy.findIndex(blog => blog.id === updatedBlog.id)
        blogsCopy.splice(updatedBlogIndex, 1, updatedBlog)
        setBlogs(blogsCopy)
    }

    const deleteBlog = async (id) => {
        try {
            await blogService.remove(id)
            const updatedBlogs = blogs.filter(blog => blog.id !== id)
            setBlogs(updatedBlogs)
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while deleting the blog'))

            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        }
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
                            value={username}
                            name='Username'
                            placeholder='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name='Password'
                            placeholder='Password'
                            onChange={({ target }) => setPassword(target.value)}
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
                <NewBlogForm createBlog={addNewBlog} />
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
                        <div>
                            <h2>blogs</h2>
                            {blogs.map(blog =>
                                <Blog key={blog.id}
                                    blog={blog}
                                    updateBlog={updateBlog}
                                    deleteBlog={deleteBlog}
                                    user={user}
                                />
                            )}
                        </div>
                    </Fragment>
                    : loginForm()
            }
        </div>
    )
}

export default App