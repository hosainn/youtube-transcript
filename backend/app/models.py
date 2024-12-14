from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, JSON, TIMESTAMP, String, func

Base = declarative_base()

class TranscriptHistory(Base):
    __tablename__ = "transcripthisotry"

    id = Column(Integer, primary_key=True, autoincrement=True)
    video_id = Column(String(11), nullable=False)
    ip_address = Column(String(45), nullable=False)
    transcript = Column(JSON, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
