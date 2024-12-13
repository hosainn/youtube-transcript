from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from config.logconfig import logger

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    logger.debug("Debug message")
    logger.info("Info message")
    logger.warning("Warning message")
    logger.error("Error message")
    logger.critical("Critical message")
    return {"Hello": "world"}

@app.get("/api/v1/")
def index(videoId):
    res = YouTubeTranscriptApi.get_transcript(videoId)
    return {"videoId": videoId, "transcript": res}