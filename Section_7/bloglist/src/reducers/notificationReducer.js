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

export const setNotification = (type, text) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            type,
            text
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer