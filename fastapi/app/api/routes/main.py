from fastapi import APIRouter, Depends
from app.api.routes import task
from app.api.dependencies.security import get_api_key


api_router = APIRouter()

api_router.include_router(task.router, dependencies=[Depends(get_api_key)], prefix="/api/tasks", tags=["Tasks"])