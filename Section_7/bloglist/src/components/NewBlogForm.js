import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import './NewBlogForm.css'

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const addNewBlog = (e) => {
        e.preventDefault()

        dispatch(createNewBlog({
            title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value
        }))

        e.target.title.value = ''
        e.target.author.value = ''
        e.target.url.value = ''
    }

    const resetMargin = {
        marginTop: 0
    }

    return (
        <div>
            <h2 style={resetMargin}>Create new blog</h2>
            <form onSubmit={addNewBlog}>
                <div>
                    <input
                        id='title'
                        type="text"
                        name='title'
                        placeholder='Title'
                    />
                </div>
                <div>
                    <input
                        id='author'
                        type="text"
                        name='author'
                        placeholder='Author'
                    />
                </div>
                <div>
                    <input
                        id='url'
                        type="text"
                        name='url'
                        placeholder='Url'
                    />
                </div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default NewBlogForm