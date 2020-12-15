import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const tbody = users ? users
        .map(user =>
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        ) : 'Loading...'

    const divPadding = {
        paddingTop: 20
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
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