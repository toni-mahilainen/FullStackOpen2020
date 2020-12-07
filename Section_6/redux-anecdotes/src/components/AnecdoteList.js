import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (id) => {
        const votedAnecdote = props.anecdotes.find(anecdote => anecdote.id === id)
        
        props.voteAnecdote(id, votedAnecdote)
        props.setNotification(`You voted '${votedAnecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )

    // const anecdotes = useSelector(({ anecdotes, filter }) => {
    //     if (filter === '') {
    //         return anecdotes.sort((obj1, obj2) => obj2.votes - obj1.votes)
    //     }
    //     return anecdotes
    //         .sort((obj1, obj2) => obj2.votes - obj1.votes)
    //         .filter(anecdote => anecdote.content.toLowerCase().startsWith(filter.toLowerCase(), 0))
    // })

    // const anecdotes = useSelector(({ anecdotes, filter }) => {
    //     if (filter === '') {
    //         return anecdotes.sort((obj1, obj2) => obj2.votes - obj1.votes)
    //     }
    //     return anecdotes
    //         .sort((obj1, obj2) => obj2.votes - obj1.votes)
    //         .filter(anecdote => anecdote.content.toLowerCase().startsWith(filter.toLowerCase(), 0))
    // })
    // const dispatch = useDispatch()

    // const vote = (id) => {
    //     const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)

    //     dispatch(voteAnecdote(id, votedAnecdote))
    //     dispatch(setNotification(`You voted '${votedAnecdote.content}'`, 5))
    // }

    // return (
    //     <div>
    //         {props.anecdotes.map(anecdote =>
    //             <div key={anecdote.id}>
    //                 <div>
    //                     {anecdote.content}
    //                 </div>
    //                 <div>
    //                     has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // )
}

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes.sort((obj1, obj2) => obj2.votes - obj1.votes)
        }
    }
    return {
        anecdotes: state.anecdotes
            .sort((obj1, obj2) => obj2.votes - obj1.votes)
            .filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase(), 0))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteAnecdote: (id, votedAnecdote) => {
            dispatch(voteAnecdote(id, votedAnecdote))
        },
        setNotification: (text, time) => {
            dispatch(setNotification(text, time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
// export default AnecdoteList