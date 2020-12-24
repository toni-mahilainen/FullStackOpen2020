import React from 'react'

const Books = ({ show, books }) => {
    console.log('books', books);
    if (!show) {
        return null
    }

    const array = books.map(book => {
        console.log('1', book.genres.map(genre => console.log('2', genre)));
    })

    return (
        <div>
            <h2>Books</h2>

            <h3>Filter by genre</h3>
            <select>
                {
                    <option value={books.genres}></option>
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