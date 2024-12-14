from database.session import engine
from models import Base

async def create_table():
    Base.metadata.create_all(bind=engine)