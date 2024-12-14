from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from middleware import GeneralExceptionMiddleware, RequestLogMiddleware
from config.logconfig import logger
from database.session import engine
from database.table import create_table
from models import Base

Base.metadata.create_all(bind=engine)

# @asynccontextmanager
# async def lifespan(_app: FastAPI):
#     logger.info("Creating............")
#     await create_table()
#     yield
#     if engine is not None:
#         logger.info("Closing..........")
#         engine.dispose()

app = FastAPI()

app.add_middleware(GeneralExceptionMiddleware)
app.add_middleware(RequestLogMiddleware)

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