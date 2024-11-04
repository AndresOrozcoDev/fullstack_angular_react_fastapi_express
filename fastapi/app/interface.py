from pydantic import BaseModel
from typing import Optional

class Response(BaseModel):
    status_code: int
    message: str
    data: list

class Task(BaseModel):
    name: str
    description: str
    status: str
    created: str
    updated: str