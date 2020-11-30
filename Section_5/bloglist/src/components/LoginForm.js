// import React, { useState, useEffect } from 'react'

// const NewBlogForm = () => {
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [url, setUrl] = useState('');

//     return (
//         <div>
//             <h2>Log in</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <input
//                         type="text"
//                         value={username}
//                         name='Username'
//                         placeholder='Username'
//                         onChange={({ target }) => setUsername(target.value)}
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="password"
//                         value={password}
//                         name='Password'
//                         placeholder='Password'
//                         onChange={({ target }) => setPassword(target.value)}
//                     />
//                 </div>
//                 <button type="submit" >login</button>
//             </form>
//         </div>
//     )
// }

// export default NewBlogForm