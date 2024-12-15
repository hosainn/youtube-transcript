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

const groupTranscriptByTime = (transcripts) => {
    return transcripts.reduce((groupedTranscript, line) => {
        const timeKey = Math.floor(line.start);
        if (!groupedTranscript[timeKey]) {
            groupedTranscript[timeKey] = [];
        }
        groupedTranscript[timeKey].push(line);
        return groupedTranscript;
    }, {});
};

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
    groupTranscriptByTime: groupTranscriptByTime,
    getHighlightColor: getHighlightColor
};

export default TranscriptViewerUtil