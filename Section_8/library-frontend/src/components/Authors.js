import React from 'react'
import EditAuthorForm from './EditAuthorForm'

const Authors = ({ show, authors, loggedIn }) => {
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            Born
                        </th>
                        <th>
                            Books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.books.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loggedIn ? <EditAuthorForm authors={authors} /> : null}
        </div>
    )
}

export default Authors
