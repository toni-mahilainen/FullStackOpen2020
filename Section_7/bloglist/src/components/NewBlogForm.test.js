import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
    test('calls the "createBlog"-function with right content on submit', () => {
        const createBlog = jest.fn()
        const component = render(
            <NewBlogForm createBlog={createBlog} />
        )

        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'How to test React frontend' }
        })

        fireEvent.change(authorInput, {
            target: { value:'Toni Mahilainen' }
        })

        fireEvent.change(urlInput, {
            target: { value: 'https://blog.reacttesting.com' }
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls[0][0].title).toBe('How to test React frontend');
        expect(createBlog.mock.calls[0][0].author).toBe('Toni Mahilainen');
        expect(createBlog.mock.calls[0][0].url).toBe('https://blog.reacttesting.com');
    });
});
