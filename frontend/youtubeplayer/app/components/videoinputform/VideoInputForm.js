"use client"

import React from 'react'
import { useState } from 'react'
import "./videoinput.css"
import ErrorViewer from './errorviewer/ErrorViewer'

const VideoInputForm = () => {
    const [videoUrl, setVideoUrl] = useState("")
    const [error, setError] = useState("")

    const onSubmitHandler = () => {
        alert("Click");
        if (videoUrl === "") {

            setError("Please provide youtube video link")
        }
    }


    return (
        <>
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
                        <span id="submitButton" onClick={onSubmitHandler}>Submit</span>
                    </span>
                </div>
            </div>
        </div>
        <ErrorViewer errorMessage={error} />
        </>
    )
}

export default VideoInputForm