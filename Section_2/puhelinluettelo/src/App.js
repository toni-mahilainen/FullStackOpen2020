import React, { useState } from 'react'

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
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} /><br />
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ namesToShow }) => {
  return (
    <ul>
      {namesToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filtering, setFiltering] = useState(false)

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

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (!names.includes(newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
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
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Header text='Numbers' />
      <Persons namesToShow={namesToShow}/>
    </div>
  )

}

export default App