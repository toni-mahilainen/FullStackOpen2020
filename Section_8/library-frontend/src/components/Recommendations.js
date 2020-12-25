import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, user }) => {
    const [getFiltered, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        getFiltered({ variables: { genre: user.favoriteGenre } })
    }, [getFiltered, user.favoriteGenre]);

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
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
                    {
                        result.data.allBooks ?
                            result.data.allBooks.map(a =>
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.published}</td>
                                </tr>
                            ) : <p>Loading...</p>}
                </tbody>
            </table>
        </div>
    );
}

export default Recommendations