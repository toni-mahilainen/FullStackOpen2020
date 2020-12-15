import React from 'react'
import '../App.css'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            </ul>
        </div>
    )
}

const BlogList = ({ blogs, user }) => {
    return (
        <div>
            <h2>Blogs</h2>
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