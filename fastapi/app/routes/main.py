from fastapi import APIRouter, Depends
from app.routes import task


api_router = APIRouter()

api_router.include_router(task.router, prefix="/api/v1/task", tags=["Task"])