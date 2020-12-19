import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BLOGS':
            state = action.data
            return state

        case 'CREATE_BLOG':
            return [...state, action.data]

        case 'UPDATE_BLOG':
            state = state.map(blog => blog.id !== action.data.id ? blog : action.data)
            return state

        case 'COMMENT_BLOG':
            const blog = state.find(blog => blog.id === action.data.id)
            const updatedBlog = {
                ...blog,
                comments: [...blog.comments, {
                    comment: action.data.addedCommentObj.comment,
                    id: action.data.addedCommentObj.id
                }]
            }
            state = state.map(blog => blog.id !== action.data.id ? blog : updatedBlog)
            return state

        case 'DELETE_BLOG':
            state = state.filter(blog => blog.id !== action.data.id)
            return state

        default:
            return state
    }
}

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'GET_BLOGS',
            data: blogs
        })
    }
}

export const createNewBlog = (blogObj) => {
    return async dispatch => {
        try {
            let createdBlog = await blogService.create(blogObj)
            dispatch({
                type: 'CREATE_BLOG',
                data: createdBlog
            })
            dispatch(setNotification('success', `a new blog "${createdBlog.title}" by ${createdBlog.author} added`, 5))
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while adding a new blog', 5))
        }
    }
}

export const updateBlog = (id, blogObj) => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.update(id, blogObj)
            dispatch({
                type: 'UPDATE_BLOG',
                data: updatedBlog
            })
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while updating the blog', 5))
        }
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        try {
            const addedCommentObj = await commentService.create(id, comment)
            dispatch({
                type: 'COMMENT_BLOG',
                data: { id, addedCommentObj }
            })
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while updating the blog', 5))
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        try {
            await blogService.remove(id)
            dispatch({
                type: 'DELETE_BLOG',
                data: { id }
            })
            dispatch(setNotification('success', 'The blog has deleted successfully!', 5))
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while deleting the blog', 5))
        }
    }
}

export default reducer