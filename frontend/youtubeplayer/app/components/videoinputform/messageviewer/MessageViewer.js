import React from 'react';
import "./messageviewer.css";

const renderMessage = (message) => {
    if (message.type === "error") {
        return (
            <div id="errorViewerContainer">{message.message}</div>
        );
    } else {
        return (<div id="messageViewContainer">{message.message}</div>)
    }
}

const MessageViewer = (props) => {
    return renderMessage(props.message)
}

export default MessageViewer