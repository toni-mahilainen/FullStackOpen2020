import React from 'react'
import { fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
    test('blog title is rendered by default', () => {
        const blog = {
            title: "Blog for testing",
            author: "Toni Mahilainen",
            user: {
                username: "tonima",
                name: "Toni Mahilainen"
            },
            url: "https://blog.test.com",
            likes: 2
        }

        const user = {
            username: "tonima"
        }

        const updateBlog = () => {
            console.log('updateBlog');
        }

        const deleteBlog = () => {
            console.log('deleteBlog');
        }

        const component = render(
            <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )

        expect(component.container).toHaveTextContent(
            'Blog for testing'
        )

        expect(component.container).not.toHaveTextContent(
            'Toni Mahilainen'
        )
        
        expect(component.container).not.toHaveTextContent(
            'https://blog.test.com'
        )
        
        expect(component.container).not.toHaveTextContent(
            '2'
        )
    });

    test('blog info is rendered after "show info"-button is pressed', () => {
        const blog = {
            title: "Blog for testing",
            author: "Toni Mahilainen",
            user: {
                username: "tonima",
                name: "Toni Mahilainen"
            },
            url: "https://blog.test.com",
            likes: 2
        }

        const user = {
            username: "tonima"
        }

        const updateBlog = () => {
            console.log('updateBlog');
        }

        const deleteBlog = () => {
            console.log('deleteBlog');
        }

        const component = render(
            <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )
        
        const button = component.getByText('show info')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'Toni Mahilainen'
        )

        expect(component.container).toHaveTextContent(
            'https://blog.test.com'
        )

        expect(component.container).toHaveTextContent(
            '2'
        )
    });

    test('clicking the like-button twice calls the event handler twice', () => {
        const blog = {
            title: "Blog for testing",
            author: "Toni Mahilainen",
            user: {
                username: "tonima",
                name: "Toni Mahilainen"
            },
            url: "https://blog.test.com",
            likes: 2
        }

        const user = {
            username: "tonima"
        }

        const updateBlog = () => {
            console.log('updateBlog');
        }

        const deleteBlog = () => {
            console.log('deleteBlog');
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} deleteBlog={deleteBlog} user={user} />
        )
        
        const showInfoBtn = component.getByText('show info')
        fireEvent.click(showInfoBtn)

        const likeBtn = component.getByText('like')
        fireEvent.click(likeBtn)
        fireEvent.click(likeBtn)

        expect(mockHandler.mock.calls).toHaveLength(2)
    });
});
