"""
app.py - Flask API for Full-Stack Task Manager
This simple API manages tasks, allowing you to retrieve, add, and update tasks.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage for tasks (each task is represented as a dictionary)
tasks = [
    {"id": 1, "title": "Learn Flask", "completed": False},
    {"id": 2, "title": "Build a React App", "completed": False},
]


@app.route("/tasks", methods=["GET"])
def get_tasks():
    """
    GET /tasks
    Returns a list of all tasks.
    """
    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def add_task():
    """
    POST /tasks
    Adds a new task.
    Expected JSON format:
    {
        "title": "Task title",
        "completed": false  # Optional, defaults to false if not provided.
    }
    """
    new_task = request.get_json()
    if "title" not in new_task:
        return jsonify({"error": "Task title is required"}), 400

    new_task["id"] = tasks[-1]["id"] + 1 if tasks else 1
    new_task.setdefault("completed", False)
    tasks.append(new_task)
    return jsonify(new_task), 201


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    """
    PUT /tasks/<task_id>
    Updates the specified task.
    Expected JSON format:
    {
        "completed": true  # or false
    }
    """
    update_data = request.get_json()
    for task in tasks:
        if task["id"] == task_id:
            # Update only the 'completed' field for now
            if "completed" in update_data:
                task["completed"] = update_data["completed"]
            return jsonify(task), 200
    return jsonify({"error": "Task not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
