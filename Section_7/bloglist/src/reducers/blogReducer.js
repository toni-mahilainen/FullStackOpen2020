import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BLOGS':
            state = action.data.blogs
            return state

        case 'CREATE_BLOG':
            return [...state, action.data]

        case 'UPDATE_BLOG':
            state = state.map(blog => blog.id !== action.data.id ? blog : action.data)
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
            data: {
                blogs
            }
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

export const deleteBlog = (id) => {
    return async dispatch => {
        try {
            await blogService.remove(id)
            dispatch({
                type: 'DELETE_BLOG',
                data: { id }
            })
        } catch (error) {
            dispatch(setNotification('error', 'Error detected while deleting the blog', 5))
        }
    }
}

export default reducer