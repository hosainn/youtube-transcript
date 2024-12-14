import sys
import logging
from logging.handlers import RotatingFileHandler
from config.setting import get_setting

setting = get_setting()

ENVIRONMENT = setting.ENVIRONMENT

logger = logging.getLogger()

if ENVIRONMENT == "prod":
    logger.setLevel(logging.INFO)
else:
    logger.setLevel(logging.DEBUG)

formatter = logging.Formatter(fmt="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

file_handler = RotatingFileHandler(
    "/var/log/youtube_transcript.log", maxBytes=5 * 1024 * 1024, backupCount=3
)
# file_handler = logging.FileHandler("youtube_transcript.log")
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.DEBUG)
logger.addHandler(file_handler)

if ENVIRONMENT == "dev":
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setFormatter(formatter)
    stream_handler.setLevel(logging.DEBUG)
    logger.addHandler(stream_handler)

