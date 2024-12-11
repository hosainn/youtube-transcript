"use client"

import React from 'react'
import { useContext, useState, useRef, useEffect } from 'react';
import TranscriptViewerUtil from "./transcriptviewerutil.js";
import { HomePageContext } from "../../page.js";
import "./transcriptviewer.css"

const renderTimeFormatView = (currentTime, time) => {
    return (
        <span
            className='currentTimeText'
            style={{ color: currentTime === parseInt(time, 10) ? "#000" : "#888" }}
        >
            {TranscriptViewerUtil.formatTime(parseInt(time, 10))}
        </span>
    )
}

const renderHighlightedLine = (lines, currentTime) => {
    return (
        <div>
            {lines.map((line, idx) => (
                <div
                    key={idx}
                    data-start={Math.floor(line.start)}
                    style={{
                        backgroundColor:
                            TranscriptViewerUtil.getHighlightColor(currentTime, line)
                    }}
                >
                    <strong>{line.text}</strong>
                </div>
            ))}
        </div>
    )
}

const renderGroupTranscript = (currentTime, transcript) => {
    let groupedTranscript = TranscriptViewerUtil.getGroupedTranscript(transcript);
    return (
        <div id="liveTranscriptContainer">
            {Object.entries(groupedTranscript).map(([time, lines], index) => (
                <div key={index}>
                    <div className='singleTranscriptContiner'>
                        {renderTimeFormatView(currentTime, time)}
                        {renderHighlightedLine(lines, currentTime)}
                    </div>
                </div>
            ))}
        </div>
    )
}

const TranscriptViewer = () => {
    const [currentTime, setCurrentTime] = useState(0);
    let { transcriptData, playerRef } = useContext(HomePageContext);
    const transcriptRef = useRef(null);

    const scrollToCurrentTranscript = () => {
        if (transcriptRef.current) {
            const currentItem = transcriptRef.current.querySelector(
                `[data-start="${currentTime}"]`
            );
            if (currentItem) {
                currentItem.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }

    useEffect(() => {
        scrollToCurrentTranscript();
    }, [currentTime]);

    useEffect(() => {
        if (playerRef) {
            const interval = setInterval(() => {
                if (playerRef.current !== null) {
                    const time = playerRef.current.getCurrentTime();
                    setCurrentTime(Math.floor(time));
                }
            }, 500);
            return () => clearInterval(interval);
        }

    }, [playerRef])

    return (
        <div id="transcriptContaier">
            <div id="transcriptTitle">Transcripts</div>
            <div id="transcriptWrapper" ref={transcriptRef}>
                {renderGroupTranscript(currentTime, transcriptData.transcript)}
            </div>
        </div>
    )
}

export default TranscriptViewer;