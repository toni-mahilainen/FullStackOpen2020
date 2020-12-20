import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './UserInfo.css'

const UserInfo = ({ users }) => {
    const id = useParams().id
    const user = users ? users.find(user => user.id === id) : null
    return (
        <div className='user-info'>
            {user ?
                <Fragment>
                    <h2>{user.name}</h2>
                    <h3>Added blogs</h3>
                    <table>
                        <tbody>
                            {user.blogs.map(blog => <tr><td>{blog.title}</td></tr>)}
                        </tbody>
                    </table>
                </Fragment>
                : <h2>Loading...</h2>
            }
        </div>
    );
}

export default UserInfo