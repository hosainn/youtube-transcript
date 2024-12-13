const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};

const getGroupedTranscript = (transcript) => {
    return transcript.reduce((acc, item) => {
        const time = Math.floor(item.start);
        if (!acc[time]) {
            acc[time] = [];
        }
        acc[time].push(item);
        return acc;
    }, {});
}

const getHighlightColor = (currentTime, line) => {
    return currentTime >= Math.floor(line.start) &&
        currentTime < Math.floor(line.start + line.duration)
        ?
        "#f0f0f0"
        :
        "gray"
};

const TranscriptViewerUtil = {
    formatTime: formatTime,
    getGroupedTranscript: getGroupedTranscript,
    getHighlightColor: getHighlightColor
};

export default TranscriptViewerUtil