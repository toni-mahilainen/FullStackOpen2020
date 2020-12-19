import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { commentBlog, updateBlog, deleteBlog } from '../reducers/blogReducer'
import Button from './Button'
import './BlogInfo.css'

const BlogComments = ({ blogId, comments }) => {
    const dispatch = useDispatch()

    const addComment = async (e) => {
        e.preventDefault()

        dispatch(
            commentBlog(blogId, {
                comment: e.target.comment.value
            })
        )

        e.target.comment.value = ''
    }
    return (
        <div className='blog-comments'>
            <hr />
            <h3>Comments</h3>
            <div>
                <form onSubmit={addComment}>
                    <div>
                        <input
                            id="username"
                            type="text"
                            name='comment'
                            placeholder='Comment'
                        />
                    </div>
                    <button id="addCommentBtn" type="submit" >add comment</button>
                </form>
            </div>
            <table>
                <tbody>
                    { comments.length !== 0 ? 
                        comments.map(comment =>
                            <tr key={comment.id}><td>{comment.comment}</td></tr>
                        ) : <h3>No comments :)</h3>
                    }
                </tbody>
            </table>
        </div>
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
        <div className='blog-info'>
            {
                blog ?
                    <Fragment>
                        <h2>{blog.title}</h2>
                        <table>
                            <tbody>
                                <tr><td><a href={blog.url}>{blog.url}</a></td></tr>
                                <tr><td>{blog.likes} likes <Button id='likeBtn' type='button' text='like' onClick={addLike} /></td></tr>
                                <tr><td>added by {blog.user.name}</td></tr>
                            </tbody>
                        </table>
                        {
                            isSignedUser ?
                                <Button
                                    id='deleteBlogBtn'
                                    type='button'
                                    text='delete'
                                    onClick={handleDelete}
                                /> : null
                        }
                        <BlogComments blogId={blog.id} comments={blog.comments} />
                    </Fragment>
                    : <h2>Loading...</h2>
            }
        </div>
    );
}

export default BlogInfo