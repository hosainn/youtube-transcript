const verifyYoutubeUrl = (url) => {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    let videoId = regex.exec(url)[3];
    if (videoId && videoId.length === 11) {
        return videoId
    }
    return null;
};

const fetchTranscript = (
    videoId, successHandler, errorHanler, apiVersion = "v1"
) => {
    const baseUrl = `http://127.0.0.1:8000/api/${apiVersion}`;
    let url = baseUrl + "?videoId=" + videoId;
    fetch(url)
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(successHandler)
        .catch(errorHanler);
}

const VideoInputFormUtil = {
    verifyYoutubeUrl: verifyYoutubeUrl,
    fetchTranscript: fetchTranscript
};

export default VideoInputFormUtil;