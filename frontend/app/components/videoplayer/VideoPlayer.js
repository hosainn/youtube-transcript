"use client"

import React from 'react';
import { useContext, useRef } from 'react';
import Image from 'next/image'
import YouTube from "react-youtube";
import { HomePageContext } from "../../page.js";
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

const onReady = (event, playerRef, setPlayerRef) => {
    playerRef.current = event.target;
    setPlayerRef(playerRef)
}

const getVideoPlayer = (videoId, playerRef, setPlayerRef) => {
    return (
        <YouTube
            onReady={(event) => onReady(event, playerRef, setPlayerRef)}
            videoId={videoId}
            opts={{
                height: "250",
                width: "600",
                playerVars: {
                    autoplay: 1,
                    mute: 1, //Chrome is blocking autoplay https://developer.chrome.com/blog/autoplay
                },
            }}
        />
    );
}

const VideoPlayer = () => {
    const playerRef = useRef(null);
    let { transcriptData, setPlayerRef } = useContext(HomePageContext);

    return (
        <div id="videoPlayerContainer">
            {transcriptData.videoId ?
                getVideoPlayer(transcriptData.videoId, playerRef, setPlayerRef) : getGeneralView()}
        </div>
    )
}

export default VideoPlayer;