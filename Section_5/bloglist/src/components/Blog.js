import React from 'react'

const Blog = ({ blog }) => (
    <div>
        <ul>
            <li>
                <b>Title:</b> {blog.title}
            </li>
            <ul>
                <li>
                    <b>Url:</b> {blog.url}
                </li>
                <li>
                    <b>Likes:</b> {blog.likes}
                </li>
                <li>
                    <b>Author:</b> {blog.author}
                </li>

            </ul>
        </ul>
    </div>
)

export default Blog