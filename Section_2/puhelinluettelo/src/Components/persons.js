import React from 'react'
import Button from './button'

const Persons = ({ namesToShow, deleteName }) => {
    return (
        <ul>
            {namesToShow.map(person => <li key={person.id}>{person.name} {person.number} <Button text='Delete' onClick={() => deleteName(person.id)} /></li>)}
        </ul>
    )
}

export default Persons