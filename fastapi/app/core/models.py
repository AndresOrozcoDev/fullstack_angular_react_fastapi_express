import datetime

from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from app.core.database import Base


class Tasks(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    status = Column(String)
    created = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    updated = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
