import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const linkPadding = {
        padding: 5
    }

    const divPadding = {
        paddingTop: 20
    }

    return (
        <div style={divPadding}>
            <Link style={linkPadding} to='/'>Blogs</Link>
            <Link style={linkPadding} to='/users'>Users</Link>
        </div>
    )
}

export default Menu