"use client"

import React from 'react'
import { useState } from 'react';
import "./transcriptviewer.css"
import TranscriptViewerUtil from "./transcriptviewerutil.js";

const renderTimeFormatView = (currentTime, time) => {
    return (
        <span
            className='currentTimeText'
            style={{color: currentTime === parseInt(time, 10) ? "#000" : "#888"}}
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
                    style={{backgroundColor: 
                        TranscriptViewerUtil.getHighlightColor(currentTime, line)}}
                >
                    <strong>{line.text}</strong>
                </div>
            ))}
        </div>
    )
}

const renderGroupTranscript = (currentTime) => {
    return (
        <div id="liveTranscriptContainer">
            {Object.entries(TranscriptViewerUtil.groupedTranscript).map(([time, lines], index) => (
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

    return (
        <div id="transcriptContaier">
            <div id="transcriptTitle">Transcripts</div>
            <div id="transcriptWrapper">
                {renderGroupTranscript(currentTime)}
            </div>
        </div>
    )
}

export default TranscriptViewer