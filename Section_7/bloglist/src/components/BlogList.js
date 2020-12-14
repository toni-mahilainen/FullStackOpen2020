import React, { useState } from 'react'
import Button from './Button'
import '../App.css'
import { useSelector } from 'react-redux'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const [showInfo, setShowInfo] = useState(false);

    const buttonStyle = {
        marginLeft: '5px'
    }

    const addLike = async () => {
        updateBlog(blog.id, {
            ...blog,
            likes: blog.likes + 1
        })
    }

    const handleDelete = () => {
        deleteBlog(blog.id)
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

const BlogList = ({ updateBlog, deleteBlog, user }) => {
    const blogs = useSelector(state => state.blogs.sort((obj1, obj2) => obj2.likes - obj1.likes))
    console.log('sortedBlogs', blogs);
    return (
        <div>
            <h2>blogs</h2>
            {
                blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                        user={user}
                    />
                )
            }
        </div>
    )
}

export default BlogList