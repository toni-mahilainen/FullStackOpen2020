import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, updateBlog }) => {
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

    const blogInfo = () => {
        return (
            <ul>
                <li>
                    <b>Url:</b> {blog.url}
                </li>
                <li>
                    <b>Likes:</b> {blog.likes}
                    <Button style={buttonStyle} type='button' text='like' onClick={addLike} />
                </li>
                <li>
                    <b>Author:</b> {blog.author}
                </li>
            </ul>
        )
    }

    return (
        <div>
            <ul>
                <li>
                    {blog.title}
                    <Button
                        style={buttonStyle}
                        type='button'
                        text={showInfo ? 'hide info' : 'show info'}
                        onClick={() => setShowInfo(!showInfo)}
                    />
                </li>
                {
                    showInfo ? blogInfo() : null
                }
            </ul>
        </div>
    )
}

export default Blog