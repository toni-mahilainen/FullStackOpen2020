import React, { useState, useEffect } from 'react'
import './App.css'
import Blogs from './components/Blogs'
import Button from './components/Button'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        setUser(loggedUser)
    }, [])

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
            setNotificationType('error')
            setNotificationMessage('Invalid username or password')
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType('')
            }, 5000)
        }
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const addNewBlog = async (e) => {
        e.preventDefault()

        const newBlog = {
            title,
            author,
            url
        }
        try {
            const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
            blogService.setToken(loggedUser.token)
            const addedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(addedBlog))
            setNotificationType('success')
            setNotificationMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
            setTitle('')
            setAuthor('')
            setUrl('')
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType('')
            }, 5000)
        } catch (error) {
            console.log(error);
        }

    }

    const loginForm = () => {
        return (
            <div>
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            value={username}
                            name='Username'
                            placeholder='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            name='Password'
                            placeholder='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" >login</button>
                </form>
            </div>
        )
    }

    const newBlogForm = () => {
        return (
            <div>
                <h2>Create new blog</h2>
                <form onSubmit={addNewBlog}>
                    <div>
                        <input
                            type="text"
                            value={title}
                            name='Title'
                            placeholder='Title'
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={author}
                            name='Author'
                            placeholder='Author'
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={url}
                            name='Url'
                            placeholder='Url'
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button type="submit" >create</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Notification type={notificationType} message={notificationMessage} />
            {
                user ?
                    <div>
                        <p>{user.name} logged in</p>
                        <Button type='button' text='log out' onClick={handleLogOut} />
                        {newBlogForm()}
                        <Blogs blogs={blogs} />
                    </div>
                    : loginForm()
            }
        </div>
    )
}

export default App