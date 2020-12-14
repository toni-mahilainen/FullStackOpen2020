const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return state = action.data

        case 'HIDE_NOTIFICATION':
            return state = null

        default:
            return state
    }
}

export const setNotification = (type, text, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                type,
                text
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, time * 1000)
    }
}

export default reducer