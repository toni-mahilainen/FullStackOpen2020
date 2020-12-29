import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, allBooks }) => {
    const [books, setBooks] = useState(allBooks);
    const initialGenres = ['all']
    const allgenres = initialGenres.concat([...new Set(allBooks.map(book => book.genres).flat())])
    const [getFiltered, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)
        }
    }, [result]);

    if (!show) {
        return null
    }

    const filterBooks = (e) => {
        e.target.value === 'all' ? getFiltered() : getFiltered({ variables: { genre: e.target.value } })
    }

    return (
        <div>
            <h2>Books</h2>

            <h3>Filter by genre</h3>
            <select onChange={filterBooks}>
                {
                    allgenres.map(genre => <option key={genre} value={genre}>{genre}</option>)
                }
            </select>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            Author
                        </th>
                        <th>
                            Published
                        </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Books