import React from 'react'
import "./errorviewer.css"

const ErrorViewer = (props) => {
    return (
        <div id="errorViewerContainer">{props.errorMessage}</div>
    )
}

export default ErrorViewer