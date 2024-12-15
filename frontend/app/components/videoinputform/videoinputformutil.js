const verifyYoutubeUrl = (url) => {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    let extractor = regex.exec(url);
    if (extractor === null) {
        return null;
    }
    let videoId = extractor[3];
    if (videoId && videoId.length === 11) {
        return videoId
    }
    return null;
};

const errorExtractor = async (error, errorHanler) => {
    if (error instanceof TypeError) {
        errorHanler("Network error or Internal server error");
    } else {
        try {
            let errorResponse = await error.json();
            errorHanler(errorResponse.error);
        } catch (e) {
            errorHanler("Unexpected error occured. Please try again");
        }
    }
}

const fetchTranscript = (
    videoId, successHandler, errorHanler, apiVersion = "v1"
) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/transcirpt/${videoId}`;
    fetch(url)
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((data) => {
            successHandler(data, videoId)
        })
        .catch((error) => {
            errorExtractor(error, errorHanler);
        });
}

const VideoInputFormUtil = {
    verifyYoutubeUrl: verifyYoutubeUrl,
    fetchTranscript: fetchTranscript
};

export default VideoInputFormUtil;