from functools import lru_cache
from pydantic_settings import BaseSettings

class Setting(BaseSettings):
    ENVIRONMENT: str = "dev"
    DATABASE_URL: str
    ALLOWED_ORIGINS: str

def get_setting():
    return Setting()
