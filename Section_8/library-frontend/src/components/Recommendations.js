import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommendations = ({ show, user }) => {
    const resultUser = useQuery(USER)
    const [favoriteGenre, setFavoriteGenre] = useState('');
    const [getFiltered, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (user) {
            getFiltered({ variables: { genre: user.favoriteGenre } })
            setFavoriteGenre(user.favoriteGenre)
        }
    }, [getFiltered]);

    if (!show) {
        return null
    }

    if (!resultUser) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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