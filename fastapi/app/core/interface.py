import datetime

from typing import Optional
from pydantic import BaseModel


class Response(BaseModel):
    status_code: int
    message: str
    data: list

class Tasks(BaseModel):
    name: str
    description: str
    status: str
    created: Optional[datetime.datetime] = None
    updated: Optional[datetime.datetime] = None