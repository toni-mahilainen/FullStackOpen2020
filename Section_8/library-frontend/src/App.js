import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
    const [token, setToken] = useState(null);
    const [page, setPage] = useState('authors')
    const resultUser = useQuery(USER)
    const resultAuthors = useQuery(ALL_AUTHORS)
    const resultBooks = useQuery(ALL_BOOKS)
    const client = useApolloClient()

    useEffect(() => {
        setToken(localStorage.getItem('library-user-token'))
    }, [])

    if (resultAuthors.loading) {
        return <div>loading...</div>
    }

    if (resultBooks.loading) {
        return <div>loading...</div>
    }

    const logout = () => {
        setToken(null)
        setPage('authors')
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            {
                token ?
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommendations')}>recommendations</button>
                        <button onClick={logout}>log out</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setPage('login')}>login</button>
                    </div>
            }

            <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} loggedIn={token} />
            <Books show={page === 'books'} allBooks={resultBooks.data.allBooks} />
            <LoginForm setToken={setToken} setPage={setPage} show={page === 'login'} />
            <NewBook show={page === 'add'} />
            <Recommendations show={page === 'recommendations'} allBooks={resultBooks.data.allBooks} user={resultUser.data.me} />
        </div>
    )
}

export default App