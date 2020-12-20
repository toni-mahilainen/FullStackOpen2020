import React from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css'

const UsersList = ({users}) => {
    const tbody = users ? users
        .map(user =>
            <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        ) : 'Loading...'

    return (
        <div className='users'>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th className='name-th'>Name</th>
                        <th className='blogs-created-th'>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList