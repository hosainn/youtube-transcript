"use client"

import React from 'react'
import { useContext, useState } from 'react'
import "./videoinput.css"
import MessageViewer from './messageviewer/MessageViewer'
import VideoInputFormUtil from './videoinputformutil';
import { HomePageContext } from "../../page.js";

const VideoInputForm = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [message, setMessage] = useState({ message: "", type: null });
    const [currentVideoId, setCurrentVideoId] = useState(null);

    let { setTranscriptData } = useContext(HomePageContext);

    const messageSetter = (msg, type = "error") => {
        setMessage({ message: msg, type: type });
    }

    const transcriptHandler = (data, videoId) => {
        setCurrentVideoId(videoId);
        messageSetter("", null);
        setTranscriptData({ videoId: videoId, transcript: data });
    }

    const onSubmitHandler = () => {
        let trimmedVideoUrl = videoUrl.trim()
        if (trimmedVideoUrl === "") {
            messageSetter("Please provide youtube video url");
        } else {
            let videoId = VideoInputFormUtil.verifyYoutubeUrl(trimmedVideoUrl);
            if (videoId === null) {
                messageSetter("Please provide a valid youtube video url");
            } else if (currentVideoId === videoId) {
                messageSetter("This video is already loaded!", null);
            } else {
                VideoInputFormUtil.fetchTranscript(
                    videoId,
                    transcriptHandler,
                    messageSetter
                );
            }
        }
    }

    const inputChangeHandler = (event) => {
        setVideoUrl(event.target.value);
        setMessage("");
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
                        onChange={inputChangeHandler}
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
            <MessageViewer message={message} />
        </>
    )
}

export default VideoInputForm