import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

const UserInfo = ({ users }) => {
    const id = useParams().id
    const user = users ? users.find(user => user.id === id) : null
    return (
        <div>
            {user ?
                <Fragment>
                    <h2>{user.name}</h2>
                    <h3>Added blogs</h3>
                    <ul>
                        {user.blogs.map(blog => <li>{blog.title}</li>)}
                    </ul>
                </Fragment>
                : <h2>Loading...</h2>
            }
        </div>
    );
}

export default UserInfo