import React from 'react'
import "./videoinput.css"

const VideoInputForm = () => {
    return (
        <div id="inputFormContaier">
            <div id="urlTextContiner">
                <div><span>Url:</span></div>
            </div>
            <div id="inputFieldContainer">
                <input
                    id="inputField"
                    name="myInput"
                />
            </div>
            <div id="submitterTextContainer">
                <div>
                    <span className="submitter">
                        Submit
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoInputForm