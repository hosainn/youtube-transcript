import re
from fastapi import HTTPException, status, BackgroundTasks
from models import TranscriptHistory
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
    NoTranscriptAvailable,
    VideoUnavailable,
    NoTranscriptFound
)
from config.logconfig import logger
from transcriptschema import Transcript

VIDEO_ID_REGEX = re.compile(r'^[a-zA-Z0-9_-]{11}$')

def validate_video_id(video_id: str) -> str:
    if not VIDEO_ID_REGEX.match(video_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid video id"
        )
    return video_id

def save_transcripts_history(
    video_id: str, transcript: Transcript, ip_address: str, db: Session
):
    try:
        new_history = TranscriptHistory(
            video_id=video_id,
            ip_address=ip_address,
            transcript=transcript
        )
        db.add(new_history)
        db.commit()
        db.refresh(new_history)
        logger.info(f"Saved transcript history for the video id: {video_id}")
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save transcript history for: {str(e)}")


def get_youtube_transcript(
    video_id: str, ip_address: str, backgroud_task: BackgroundTasks, db: Session
) -> Transcript:
    try:
        transcripts = YouTubeTranscriptApi.get_transcript(video_id)
        backgroud_task.add_task(
            save_transcripts_history, video_id, transcripts, ip_address, db
        )
        return transcripts
    except TranscriptsDisabled as e:
        error_msg = "Transcripts are disabled for this video"
        logger.error(error_msg + " id: " + video_id)
        logger.error(str(e))
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error_msg)
    except NoTranscriptAvailable as e:
        error_msg = "No transcript available for this video"
        logger.error(error_msg + " id: " + video_id)
        logger.error(str(e))
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error_msg)
    except NoTranscriptFound as e:
        error_msg = "No transcript found for this video"
        logger.error(error_msg + " id: " + video_id)
        logger.error(str(e))
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error_msg)
    except VideoUnavailable as e:
        error_msg = "Video is unavailable"
        logger.error(error_msg + " for this video id: " + video_id)
        logger.error(str(e))
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error_msg)
