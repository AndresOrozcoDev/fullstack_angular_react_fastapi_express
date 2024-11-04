from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, Body, HTTPException, status, Path, Depends

from app.database import Session
from app.services.task import TaskServices
from app.interface import Task as TaskInterface, Response


router = APIRouter()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

@router.get('', response_model=Response)
async def get_tasks(db: Session = Depends(get_db)):
    try:
        result = TaskServices(db).get_tasks()
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            'status_code': 200,
            'message': 'Task list',
            'data': jsonable_encoder(result)
        })
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post('', response_model=Response)
async def create_task(task: TaskInterface = Body(), db: Session = Depends(get_db)):
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
async def delete_task(id: int = Path(), db: Session = Depends(get_db)):
    try:
        isDeleted, task = TaskServices(db).delete_task(id)
        if not isDeleted or not task:  # Si no se encuentra la tarea o no se elimina
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found task')
        return JSONResponse(status_code=status.HTTP_200_OK, content={'status_code': 200, 'message': 'task deleted', 'data': jsonable_encoder(task)})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))