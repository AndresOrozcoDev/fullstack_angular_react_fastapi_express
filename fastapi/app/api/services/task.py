import datetime

from app.core.models import Tasks as TaskModel
from app.core.interface import Tasks as TaskInterface


class TaskServices():
    
    def __init__(self, db) -> None:
        self.db = db


    def get_tasks(self):
        result = self.db.query(TaskModel).all()
        return result

    def get_task_by_id(self, id: int):
        result = self.db.query(TaskModel).filter(TaskModel.id == id).first()
        return result

    def create_task(self, task: TaskInterface):
        new = TaskModel(**{
                "name": task.name,
                "description": task.description,
                "status": task.status,
                "created": task.created or datetime.datetime.utcnow(),
                "updated": task.updated or datetime.datetime.utcnow(),
            })
        try:
            self.db.add(new)
            self.db.commit()
            self.db.refresh(new)
            return new
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Error creating task: {str(e)}")

    def update_task(self, id: int, status: str):
        existing_task = self.get_task_by_id(id)
        if not existing_task:
            raise HTTPException(status_code=404, detail="Task not found")
        if status:
            existing_task.status = status
        existing_task.updated = datetime.datetime.utcnow()
        try:
            self.db.commit()
            self.db.refresh(existing_task)
            return existing_task
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Error updating task: {str(e)}")

    def delete_task(self, id: int):
        task = self.get_task_by_id(id)
        if not task:
            return False, task
        try:
            self.db.query(TaskModel).filter(TaskModel.id == id).delete()
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise e
        return True, task
