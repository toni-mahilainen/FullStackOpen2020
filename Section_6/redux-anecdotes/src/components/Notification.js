import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    return (
        <Fragment>
            {
                notification.show ?
                    <div style={style}>
                        {notification.message}
                    </div> : null
            }
        </Fragment>
    )
}

export default Notification