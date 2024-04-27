from app.models import TaskModel
from app.extensions import db

class TaskService:
    def get_all_tasks(self):
        """Retrieve a list of all tasks"""
        try:
            return TaskModel.query.all()
        except Exception as e:
            raise RuntimeError("Error while retrieving tasks") from e

    def get_task_by_id(self, task_id):
        """Retrieve details of a specific task"""
        try:
            return TaskModel.query.get(task_id)
        except Exception as e:
            raise RuntimeError("Error while retrieving task by ID") from e

    def create_new_task(self, task_data):
        """Create a new task"""
        try:
            new_task = TaskModel(**task_data)
            db.session.add(new_task)
            db.session.commit()
            return new_task
        except Exception as e:
            db.session.rollback()
            raise RuntimeError("Error while creating task") from e

    def update_task(self, task_id, task_data):
        """Update an existing task"""
        try:
            task = TaskModel.query.get(task_id)
            if task:
                for key, value in task_data.items():
                    setattr(task, key, value)
                db.session.commit()
                return task
            else:
                raise ValueError("Task not found")
        except Exception as e:
            db.session.rollback() 
            raise RuntimeError("Error while updating task") from e

    def delete_task(self, task_id):
        """Delete a task"""
        try:
            task = TaskModel.query.get(task_id)
            if task:
                db.session.delete(task)
                db.session.commit()
            else:
                raise ValueError("Task not found")
        except Exception as e:
            db.session.rollback()
            raise RuntimeError("Error while deleting task") from e
