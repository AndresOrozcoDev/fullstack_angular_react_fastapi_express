from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, Body, HTTPException, status, Path

from app.database import Session
from app.services.task import TaskServices
from app.interface import Task as TaskInterface, Response


router = APIRouter()

@router.get('', response_model=Response)
async def get_tasks():
    db = Session()
    result = TaskServices(db).get_tasks()
    return JSONResponse(status_code=status.HTTP_200_OK, content={'status_code': 200, 'message': 'Task list', 'data':jsonable_encoder(result)})

@router.post('', response_model=Response)
async def create_task(task: TaskInterface = Body()):
    db = Session()
    try:
        created_task = TaskServices(db).create_task(task)
        return JSONResponse(status_code=201, content={
            'status_code': 201,
            'message': 'Task created',
            'data': jsonable_encoder(created_task)
        })
    except Exception as e:
        return JSONResponse(status_code=400, content={
            'status_code': 400,
            'message': str(e),
            'data': []
        })

@router.delete('/{id}')
async def delete_task(id: int = Path()):
    db = Session()
    try:
        isDeleted, task = TaskServices(db).delete_task(id)
        if not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found task')
        return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'task deleted', 'data': jsonable_encoder(task)})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))