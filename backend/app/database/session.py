from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config.setting import get_setting
from sqlalchemy.exc import OperationalError
import time
from config.logconfig import logger

setting = get_setting()

DATABASE_URL = setting.DATABASE_URL

for _ in range(5):
    try:
        engine = create_engine(DATABASE_URL)
        connection = engine.connect()
        connection.close()
        break
    except OperationalError:
        logger.error("Database connection failed. Retrying...")
        time.sleep(5)
else: 
    raise Exception("Failed to connect to the database after multiple attempts.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()