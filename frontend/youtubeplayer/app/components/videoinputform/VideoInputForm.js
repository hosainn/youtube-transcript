import React from 'react'
import "./videoinput.css"

const VideoInputForm = () => {
    return (
        <div id="inputFormContaier">
            <div id="urlTextContiner">
                <div id="urlText"><span>Url:</span></div>
            </div>
            <div id="inputFieldContainer">
                <input
                    id="inputField"
                    name="myInput"
                />
            </div>
            <div id="submitterTextContainer">
                <div>
                    <span id="submitter">
                        <span id="submitButton">Submit</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoInputForm