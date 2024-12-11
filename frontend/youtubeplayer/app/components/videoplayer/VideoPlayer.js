"use client"

import React from 'react';
import { useState } from 'react';
import Image from 'next/image'
import YouTube from "react-youtube";

import "./videoplayer.css";

const getGeneralView = () => {
    return (
        <div id="generalViewContainer">
            <Image
                src="/youtube.png"
                width={30}
                height={30}
                alt="Picture of the author"
            />
            <span id="playerTextContainer">Youtube video player</span>
        </div>

    )
}

const getVideoPlayer = (videoId) => {
    return (
        <YouTube
            // onReady={onReady}
            videoId="UeYmRKWhwFI"
            opts={{
                height: "280",   // Set the height
                width: "600",    // Set the width
                playerVars: {
                    autoplay: 1,
                    mute: 1, //Chrome is blocking autoplay https://developer.chrome.com/blog/autoplay
                },
            }}
        />
    );
}

const VideoPlayer = () => {
    const [videoId, setVideoId] = useState(null)

    return (
        <div id="videoPlayerContainer">
            {videoId ? getVideoPlayer(videoId) : getGeneralView()}
        </div>
    )
}

export default VideoPlayer