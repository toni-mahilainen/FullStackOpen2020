import React, { useState } from 'react'
import Button from './Button'
import '../App.css'
import PropTypes from 'prop-types'

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
                    <b>Likes:</b> <span>{blog.likes}</span>
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
                        id='toggleBlogInfoBtn'
                        style={buttonStyle}
                        type='button'
                        text={showInfo ? 'hide info' : 'show info'}
                        onClick={() => setShowInfo(!showInfo)}
                    />
                    {
                        showInfo && isSignedUser ?
                            <Button
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

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog