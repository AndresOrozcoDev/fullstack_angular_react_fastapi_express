from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, Body, HTTPException, status, Path, Depends

from app.core.database import Session
from app.api.services.task import TaskServices
from app.core.errorHandler import Standard_response
from app.core.interface import Tasks as TaskInterface, Response


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
        return Standard_response(
            status_code=status.HTTP_200_OK,
            message="Lista de tareas.",
            data=jsonable_encoder(result)
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post('', response_model=Response)
async def create_task(task: TaskInterface = Body(), db: Session = Depends(get_db)):
    try:
        created_task = TaskServices(db).create_task(task)
        return Standard_response(
            status_code=201,
            message="Tarea creada.",
            data=jsonable_encoder(created_task)
        )
    except Exception as e:
        return Standard_response(
            status_code=400,
            message=str(e),
            data=[]
        )


@router.put('/{id}', response_model=Response)
async def update_task(id: int = Path(), task: TaskInterface = Body(), db: Session = Depends(get_db)):
    try:
        updated_task = TaskServices(db).update_task(id, task)
        if not updated_task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tarea no encontrada')
        return Standard_response(
            status_code=status.HTTP_200_OK,
            message="Tarea actualizada",
            data=jsonable_encoder(updated_task)
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.delete('/{id}')
async def delete_task(id: int = Path(), db: Session = Depends(get_db)):
    try:
        isDeleted, task = TaskServices(db).delete_task(id)
        if not isDeleted or not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tarea no encontrada')
        return Standard_response(
            status_code=status.HTTP_200_OK,
            message="Tarea eliminada",
            data=jsonable_encoder(task)
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
