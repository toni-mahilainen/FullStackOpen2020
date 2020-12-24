import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'

const App = () => {
    const [token, setToken] = useState(null);
    const [page, setPage] = useState('books')
    const resultAuthors = useQuery(ALL_AUTHORS)
    const resultBooks = useQuery(ALL_BOOKS)
    const client = useApolloClient()

    useEffect(() => {
        setToken(localStorage.getItem('library-user-token'))
    }, []);

    if (resultAuthors.loading) {
        return <div>loading...</div>
    }

    if (resultBooks.loading) {
        return <div>loading...</div>
    }

    const logout = () => {
        setToken(null)
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
            <Books show={page === 'books'} books={resultBooks.data.allBooks} />
            <LoginForm setToken={setToken} setPage={setPage} show={page === 'login'} />
            <NewBook show={page === 'add'} />
        </div>
    )
}

export default App