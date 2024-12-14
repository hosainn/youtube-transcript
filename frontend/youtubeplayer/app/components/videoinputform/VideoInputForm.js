"use client"

import React from 'react'
import { useContext, useState } from 'react'
import "./videoinput.css"
import ErrorViewer from './errorviewer/ErrorViewer'
import VideoInputFormUtil from './videoinputformutil';
import { HomePageContext } from "../../page.js";

const VideoInputForm = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState("");
    const [currentVideoId, setCurrentVideoId] = useState(null);

    let { setTranscriptData } = useContext(HomePageContext);


    const transcriptHandler = (data, videoId) => {
        setCurrentVideoId(videoId);
        setError("");
        setTranscriptData({ videoId: videoId, transcript: data });
    }

    const onSubmitHandler = () => {
        let trimmedVideoUrl = videoUrl.trim()
        if (trimmedVideoUrl === "") {
            setError("Please provide youtube video url");
        } else {
            let videoId = VideoInputFormUtil.verifyYoutubeUrl(trimmedVideoUrl);
            if (videoId === null) {
                setError("Please provide a valid youtube url");
            } else if (currentVideoId === videoId) {
                setError("This video is already loaded!");
            } else {
                VideoInputFormUtil.fetchTranscript(
                    videoId,
                    transcriptHandler,
                    setError
                );
            }
        }
    }

    const inputChangeHandler = (event) => {
        setVideoUrl(event.target.value);
        setError("");
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
            <ErrorViewer errorMessage={error} />
        </>
    )
}

export default VideoInputForm