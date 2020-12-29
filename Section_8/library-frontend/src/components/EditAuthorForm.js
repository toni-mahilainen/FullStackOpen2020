import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from '../queries'

const EditAuthorForm = ({ authors }) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [updateAuthor] = useMutation(CHANGE_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const updateNumber = (e) => {
        e.preventDefault()
        updateAuthor({ variables: { name, setBornTo: Number(year) } })

        setName(authors[0].name)
        setYear('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={updateNumber}>
                <div>
                    <select value={name} onChange={({ target }) => setName(target.value)} >
                        {
                            authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)
                        }
                    </select><br />
                    <input placeholder='Year' value={year} onChange={({ target }) => setYear(target.value)} />
                    <button>Update author</button>
                </div>
            </form>
        </div>
    );
}

export default EditAuthorForm