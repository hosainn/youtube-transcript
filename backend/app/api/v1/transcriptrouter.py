from fastapi import APIRouter, Request, Depends, BackgroundTasks
from transcriptcontroller import get_youtube_transcript
from database.session import get_db
from sqlalchemy.orm import Session
from transcriptschema import Transcript

router = APIRouter(prefix="/v1/transcirpt")

@router.get("/{video_id}", response_model=list[Transcript])
async def get_transcript(
    request: Request,
    background_task: BackgroundTasks,
    video_id: str,
    db: Session = Depends(get_db)
):
    transcripts = get_youtube_transcript(
        video_id, request.client.host, background_task, db
    )
    return transcripts