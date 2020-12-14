import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if (notification === null) {
        return null
    }

    const cssClass = notification.type === 'success' ? 'success' : 'error'

    return (
        <div className={cssClass}>
            {notification.text}
        </div>
    )
}

export default Notification