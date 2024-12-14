from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from middleware import GeneralExceptionMiddleware, RequestLogMiddleware
from config.logconfig import logger
from database.session import engine
from models import Base
from config.setting import get_setting
from api.v1.transcriptrouter import router as transcript_router

setting = get_setting()
origins = setting.ALLOWED_ORIGINS.split(',')

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Transcripts api")

app.include_router(transcript_router, prefix="/api")

app.add_middleware(GeneralExceptionMiddleware)
app.add_middleware(RequestLogMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse( status_code=exc.status_code, content={"error": exc.detail})

@app.get("/")
def index():
    logger.debug("Debug message")
    logger.info("Info message")
    logger.warning("Warning message")
    logger.error("Error message")
    logger.critical("Critical message")
    return {"status": "green"}
