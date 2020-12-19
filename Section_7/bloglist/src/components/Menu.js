import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
    const linkPadding = {
        padding: 5
    }

    return (
        <div className='menu-nav'>
            <Link style={linkPadding} to='/'>Blogs</Link>
            <Link style={linkPadding} to='/users'>Users</Link>
        </div>
    )
}

export default Menu