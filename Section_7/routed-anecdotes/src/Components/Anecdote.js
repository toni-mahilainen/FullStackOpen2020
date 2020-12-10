import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    const padding = {
        paddingTop: 5,
        paddingBottom: 5
    }

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p style={padding}>has {anecdote.votes} votes</p>
            <p style={padding}>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote