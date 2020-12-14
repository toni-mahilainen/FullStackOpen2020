import React, { useState } from 'react'
import Button from './Button'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const [showInfo, setShowInfo] = useState(false);

    const buttonStyle = {
        marginLeft: '5px'
    }

    const addLike = () => {
        dispatch(
            updateBlog(blog.id, {
                ...blog,
                likes: blog.likes + 1
            })
        )
    }

    const handleDelete = () => {
        dispatch(deleteBlog(blog.id))
    }

    const blogInfo = () => {
        return (
            <ul className='blogInfoList'>
                <li>
                    <b>Url:</b> {blog.url}
                </li>
                <li>
                    <b>Likes:</b> <span className='likes'>{blog.likes}</span>
                    <Button id='likeBtn' style={buttonStyle} type='button' text='like' onClick={addLike} />
                </li>
                <li>
                    <b>Author:</b> {blog.author}
                </li>

            </ul>
        )
    }

    const isSignedUser = user.username === blog.user.username

    return (
        <div>
            <ul>
                <li>
                    {blog.title}
                    <Button
                        className='toggleBlogInfoBtn'
                        style={buttonStyle}
                        type='button'
                        text={showInfo ? 'hide info' : 'show info'}
                        onClick={() => setShowInfo(!showInfo)}
                    />
                    {
                        showInfo && isSignedUser ?
                            <Button
                                id='deleteBlogBtn'
                                style={buttonStyle}
                                type='button'
                                text='delete'
                                onClick={handleDelete}
                            /> : null
                    }
                </li>
                {
                    showInfo ? blogInfo() : null
                }
            </ul>
        </div>
    )
}

const BlogList = ({ deleteBlog, user }) => {
    const blogs = useSelector(state => state.blogs.sort((obj1, obj2) => obj2.likes - obj1.likes))
    return (
        <div>
            <h2>blogs</h2>
            {
                blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        deleteBlog={deleteBlog}
                        user={user}
                    />
                )
            }
        </div>
    )
}

export default BlogList