from datetime import datetime
from app.models import Task as TaskModel
from app.interface import Task as TaskInterface


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
                "created": datetime.now(),
                "updated": datetime.now(),
                "created": datetime.now(), 
            })
        self.db.add(new)
        self.db.commit()
        self.db.refresh(new)
        return new

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
