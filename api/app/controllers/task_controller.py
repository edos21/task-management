from flask_smorest import Blueprint
from flask.views import MethodView
from flask import jsonify

from app.services.task_service import TaskService
from app.schemas.task_schema import TaskSchema

bp = Blueprint("task", __name__, description="Manage tasks")

task_service = TaskService()

@bp.route('/')
def get_data():
    data = {'message': 'ready!'}
    return jsonify(data)


@bp.route("/tasks")
class TaskList(MethodView):
    @bp.response(200, TaskSchema(many=True))
    def get(self):
        """Retrieve a list of all tasks"""
        try:
            tasks = task_service.get_all_tasks()
            return tasks
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.arguments(TaskSchema)
    @bp.response(201, TaskSchema)
    def post(self, task_data):
        """Create a new task"""
        try:
            new_task = task_service.create_new_task(task_data)
            return new_task, 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@bp.route("/tasks/<int:task_id>")
class TaskDetail(MethodView):
    @bp.response(200, TaskSchema)
    def get(self, task_id):
        """Retrieve details of a specific task"""
        try:
            task = task_service.get_task_by_id(task_id)
            if task:
                return task
            else:
                return jsonify({"error": "Task not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.arguments(TaskSchema)
    @bp.response(200, TaskSchema)
    def put(self, task_data, task_id):
        """Update an existing task"""
        try:
            updated_task = task_service.update_task(task_id, task_data)
            if updated_task:
                return updated_task
            else:
                return jsonify({"error": "Task not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.response(204)
    def delete(self, task_id):
        """Delete a task"""
        try:
            task_service.delete_task(task_id)
            return "", 204
        except Exception as e:
            return jsonify({"error": str(e)}), 500
