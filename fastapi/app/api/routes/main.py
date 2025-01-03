from fastapi import APIRouter, Depends
from app.api.routes import task


api_router = APIRouter()

api_router.include_router(task.router, prefix="/api/tasks", tags=["Tasks"])