import React from 'react'

const Blog = ({ blog }) => (
    <div>
        <ul>
            <li>
                {blog.title} {blog.author}
            </li>
        </ul>
    </div>
)

export default Blog
