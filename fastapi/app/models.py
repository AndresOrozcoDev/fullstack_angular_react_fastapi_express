import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from app.database import Base

class Task(Base):
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    status = Column(String)
    created = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    updated = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
