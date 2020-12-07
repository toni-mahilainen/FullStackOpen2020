const reducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            state = action.data.filter
            return state

        default:
            return state
    }
}

export const filterAnecdotes = (filter) => {
    return {
        type: 'FILTER',
        data: { filter }
    }
}

export default reducer