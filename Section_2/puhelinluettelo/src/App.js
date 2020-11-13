import React, { useState, useEffect } from 'react'
import PersonsService from './Services/persons'
import Persons from './Components/persons'

const Header = ({ text }) => {
    return (
        <h2>{text}</h2>
    )
}

const Filter = ({ filter, handleFiltering }) => {
    return (
        <div>
            Filter shown with: <input value={filter} onChange={handleFiltering} /><br />
        </div>
    )
}

const AddNewForm = (props) => {
    return (
        <form onSubmit={props.handleAddOrUpdate}>
            <div>
                Name: <input value={props.newName} onChange={props.handleNameChange} /><br />
                Number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filtering, setFiltering] = useState(false)

    useEffect(() => {
        PersonsService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, []);

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFiltering = (event) => {
        if (event.target.value === "") {
            setFiltering(false)
        } else {
            setFiltering(true)
        }
        setFilter(event.target.value)
    }

    const handleAddOrUpdate = (event) => {
        event.preventDefault()
        const names = persons.map(person => person.name)
        names.includes(newName) ? updateNumber() : addName()
    }

    const addName = () => {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        PersonsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const updateNumber = () => {
        const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirm) {
            const person = persons.find(person => person.name === newName)
            const updatedPerson = {
                ...person,
                number: newNumber
            }
            console.log(person);
            PersonsService
                .update(person.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deleteName = (id) => {
        const person = persons.find(person => person.id === id)
        const confirm = window.confirm(`Are you sure you want to delete ${person.name} from phonebook?`)
        if (confirm) {
            PersonsService
                .remove(id)
                .then(() => {
                    const newPersons = persons.filter(person => person.id !== id);
                    setPersons(newPersons)
                })
        }
    }

    const namesToShow = filtering ? persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase())) : persons

    return (
        <div>
            <Header text='Phonebook' />
            <Filter filter={filter} handleFiltering={handleFiltering} />
            <Header text='Add a new' />
            <AddNewForm
                newName={newName}
                newNumber={newNumber}
                handleAddOrUpdate={handleAddOrUpdate}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <Header text='Numbers' />
            <Persons namesToShow={namesToShow} deleteName={(id) => deleteName(id)} />
        </div>
    )

}

export default App