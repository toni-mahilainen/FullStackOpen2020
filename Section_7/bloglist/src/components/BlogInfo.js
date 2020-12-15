import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import Button from './Button'

const BlogComments = () => {
    return (
        <h3>Comments</h3>
    )
}

const BlogInfo = ({ blogs, user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = useParams().id
    const blog = blogs ? blogs.find(blog => blog.id === id) : null

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
        history.push('/')
    }

    const isSignedUser = user && blog ? user.username === blog.user.username : false

    return (
        <div>
            {
                blog ?
                    <Fragment>
                        <h2>{blog.title}</h2>
                        <a href={blog.url}>{blog.url}</a>
                        <p>{blog.likes} likes <Button id='likeBtn' type='button' text='like' onClick={addLike} /></p>
                        <p>added by {blog.user.name}</p>
                        {
                            isSignedUser ?
                                <Button
                                    id='deleteBlogBtn'
                                    type='button'
                                    text='delete'
                                    onClick={handleDelete}
                                /> : null
                        }
                    </Fragment>
                    : <h2>Loading...</h2>
            }
            <BlogComments />
        </div>
    );
}

export default BlogInfo