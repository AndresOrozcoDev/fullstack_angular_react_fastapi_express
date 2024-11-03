from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

class Tarea(Base):
    __tablename__ = 'tarea'

    id = Column(Integer, primary_key=True)