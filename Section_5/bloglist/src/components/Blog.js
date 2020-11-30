import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
    const [showInfo, setShowInfo] = useState(false);
    // const [buttonText, setButtonText] = useState('show info');

    const blogInfo = () => {
        return (
            <ul>
                <li>
                    <b>Url:</b> {blog.url}
                </li>
                <li>
                    <b>Likes:</b> {blog.likes} <Button type='button' text='like' />
                </li>
                <li>
                    <b>Author:</b> {blog.author}
                </li>
            </ul>
        )
    }

    const buttonStyle = {
        marginLeft: '5px'
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