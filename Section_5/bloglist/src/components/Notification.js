import React from 'react'

const Notification = ({ type, message }) => {
    if (message === null) {
        return null
    }

    const cssClass = type === 'success' ? 'success' : 'error'

    return (
        <div className={cssClass}>
            {message}
        </div>
    )
}

export default Notification