import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = ({ show }) => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        update: (store, response) => {
            const dataInStoreAll = store.readQuery({ query: ALL_BOOKS })
            console.log('response.data.addBook', response.data.addBook);
            store.writeQuery({
                query: ALL_BOOKS,
                data: {
                    ...dataInStoreAll,
                    allBooks: [...dataInStoreAll.allBooks, response.data.addBook]
                }
            })
            // response.data.addBook.genres.forEach(genre => {
            //     const dataInStoreVar = store.readQuery({ query: ALL_BOOKS, variables: { genre: genre } })
            //     store.writeQuery({
            //         query: ALL_BOOKS,
            //         variables: { genre: genre },
            //         data: {
            //             ...dataInStoreVar,
            //             allBooks: [...dataInStoreVar.allBooks, response.data.addBook]
            //         }
            //     })
            // })
            response.data.addBook.genres.map((genre) => {
                const dataInStoreVar = store.readQuery({ query: ALL_BOOKS, variables: { genre: genre } })
                store.writeQuery({
                    query: ALL_BOOKS,
                    variables: { genre: genre },
                    data: {
                        ...dataInStoreVar,
                        allBooks: [...dataInStoreVar.allBooks, response.data.addBook]
                    }
                })
            })
        }
    })

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        createBook({ variables: { title, author, published: Number(published), genres } })

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
                </div>
                <div>
                    published <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook