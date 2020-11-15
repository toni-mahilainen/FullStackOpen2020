const Notification = ({ message, successNotification }) => {
    if (message === null) {
        return null
    }

    const success = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const notificationStyle = successNotification ? success : error

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;