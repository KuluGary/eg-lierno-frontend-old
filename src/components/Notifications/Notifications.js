import React, { useState, useRef, useEffect } from "react";
import NotificationsIcon from '@material-ui/icons/Notifications';
// import socket from "../../helpers/socket-util"


function Notifications() {
    const [response, setResponse] = useState(false);

    // useEffect(() => {
    //     const data = socket.listenToApi("FromApi");

    // }, [])
    return (
        <>
            <NotificationsIcon />
        </>
    )
}

export default Notifications;