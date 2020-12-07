import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    // const addAnecdote = async (e) => {
    //     e.preventDefault()

    //     const anecdote = e.target.anecdote.value
    //     e.target.anecdote.value = ''

    //     dispatch(createAnecdote(anecdote))
    //     dispatch(setNotification(`Anecdote '${anecdote}' created`, 5))
    // }

    const addAnecdote = async (e) => {
        e.preventDefault()

        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''

        props.createAnecdote(anecdote)
        props.setNotification(`Anecdote '${anecdote}' created`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input type='text' name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAnecdote: (anecdote) => {
            dispatch(createAnecdote(anecdote))
        },
        setNotification: (text, time) => {
            dispatch(setNotification(text, time))
        }
    }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
// export default AnecdoteForm