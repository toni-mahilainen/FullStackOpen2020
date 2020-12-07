import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data

        case 'VOTE':
            const id = action.data.updatedAnecdote.id
            const updatedAnecdote = action.data.updatedAnecdote

            return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)

        case 'NEW_ANECDOTE':
            return [...state, action.data]

        default:
            return state.sort((obj1, obj2) => obj2.votes - obj1.votes)
    }
}

export const voteAnecdote = (id, votedAnecdote) => {
    return async dispatch => {
        const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
        const updatedAnecdote = await anecdotesService.update(id, changedAnecdote)
        dispatch({
            type: 'VOTE',
            data: { updatedAnecdote }
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const createAnecdote = (anecdote) => {
    return async dispatch => {
        const createdAnecdote = await anecdotesService.create(anecdote)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: createdAnecdote
        })
    }
}

export default reducer