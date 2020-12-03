import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
    type: PropTypes.string.isRequired
}

export default Notification