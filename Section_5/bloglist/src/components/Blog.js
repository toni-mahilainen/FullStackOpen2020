import React from 'react'

const Blog = ({ blog }) => (
    <div>
        <ul>
            <li>
                <b>Title:</b> {blog.title} <b>Author:</b> {blog.author}
            </li>
        </ul>
    </div>
)

export default Blog