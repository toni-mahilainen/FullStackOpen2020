import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, books }) => {
    const [getFiltered, result] = useLazyQuery(ALL_BOOKS)
    const uniqueGenres = [...new Set(books.map(book => book.genres).flat())]

    if (result.data) {
        console.log('result', result.data.allBooks);
        books = result.data.allBooks
    }

    if (!show) {
        return null
    }

    const filterBooks = (e) => {
        getFiltered({ variables: { genre: e.target.value } })
    }

    return (
        <div>
            <h2>Books</h2>

            <h3>Filter by genre</h3>
            <select onChange={filterBooks}>
                {
                    uniqueGenres.map(genre => <option defaultValue='select' value={genre}>{genre}</option>)
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