import React from 'react'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import './BlogList.css'

const Blog = ({ blog }) =>
    <tr>
        <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </td>
    </tr>


const BlogList = ({ blogs, user }) => {
    return (
        <div className='blogs-table'>
            <h2>Blogs</h2>
            <table>
                <tbody>
                    {
                        blogs.map(blog =>
                            <Blog key={blog.id}
                                blog={blog}
                                deleteBlog={deleteBlog}
                                user={user}
                            />
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}

export default BlogList