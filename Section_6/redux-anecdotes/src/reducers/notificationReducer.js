const initialState = {
    show: false
}

let timeoutID

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            state = {
                show: action.data.show,
                message: action.data.text
            }
            return state

        case 'HIDE_NOTIFICATION':
            state = {
                show: action.data.show
            }
            return state

        default:
            return state
    }
}

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                show: true,
                text
            }
        })
        clearTimeout(timeoutID)

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                data: { show: false }
            })
        }, time * 1000)
    }
}

export default reducer