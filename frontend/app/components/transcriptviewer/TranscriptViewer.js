"use client"

import React from 'react'
import { useState, useRef, useEffect } from 'react';
import TranscriptViewerUtil from "./transcriptviewerutil.js";
import "./transcriptviewer.css";

const renderTimeFormatView = (currentTime, time) => {
    return (
        <span
            className='currentTimeText'
            style={{ color: currentTime === parseInt(time, 10) ? "#f0f0f0" : "gray" }}
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
                        color:
                            TranscriptViewerUtil.getHighlightColor(currentTime, line)
                    }}
                >
                    {line.text}
                </div>
            ))}
        </div>
    )
}

const renderGroupTranscript = (currentTime, transcript) => {
    let groupedTranscript = TranscriptViewerUtil.groupTranscriptByTime(transcript);
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

const TranscriptViewer = (props) => {
    const [currentTime, setCurrentTime] = useState(0);
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
        if (props.playerRef) {
            const interval = setInterval(() => {
                if (props.playerRef.current !== null) {
                    const time = props.playerRef.current.getCurrentTime();
                    setCurrentTime(Math.floor(time));
                }
            }, 900);
            return () => clearInterval(interval);
        }

    }, [props.playerRef])

    const renderTranscriptView = (transcript) => {
        return (
            <>
                <div id="transcriptTitle">Transcripts</div>
                <div id="transcriptWrapper" ref={transcriptRef}>
                    {renderGroupTranscript(currentTime, transcript)}
                </div>
            </>

        );
    }

    const renderEmptyTranscriptView = () => {
        return (
            <div id="emptyTranscriptView">
                <span>Please submit youtube video url to see transcript here</span>
            </div>
        );
    }

    return (
        <div id="transcriptContaier">
            {Array.isArray(props.transcriptData.transcript) && props.transcriptData.transcript.length === 0 ?
                renderEmptyTranscriptView() : renderTranscriptView(props.transcriptData.transcript)
            }
        </div>
    )
}

export default TranscriptViewer;