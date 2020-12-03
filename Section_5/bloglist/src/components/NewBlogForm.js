import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addNewBlog = (e) => {
        e.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addNewBlog}>
                <div>
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name='Title'
                        placeholder='Title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name='Author'
                        placeholder='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name='Url'
                        placeholder='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default NewBlogForm