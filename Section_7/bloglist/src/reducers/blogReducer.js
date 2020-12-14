import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BLOGS':
            return state = action.data.blogs

        default:
            return state
    }
}

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('blogs', blogs);
        dispatch({
            type: 'GET_BLOGS',
            data: {
                blogs
            }
        })
    }
}

export default reducer