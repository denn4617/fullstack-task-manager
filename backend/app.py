"""
app.py - Flask API for the Task Manager
This API manages tasks and provides a login endpoint.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage for tasks (each task is a dictionary)
tasks = [
    {"id": 1, "title": "Learn Flask", "completed": False},
    {"id": 2, "title": "Build a React App", "completed": False},
]

# Hardcoded user with a hashed password for demonstration.
USER = {
    "username": "admin",
    "password_hash": generate_password_hash("secret")
}


@app.route("/login", methods=["POST"])
def login():
    """
    POST /login
    Expects JSON with "username" and "password".
    Returns a dummy token and username if credentials are valid.
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Check username and hashed password.
    if username == USER["username"] and check_password_hash(USER["password_hash"], password):
        return jsonify({"token": "dummy-token", "username": username}), 200
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/tasks", methods=["GET"])
def get_tasks():
    """GET /tasks: Return a list of all tasks."""
    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def add_task():
    """
    POST /tasks: Add a new task.
    Expected JSON format:
    {
        "title": "Task title",
        "completed": false  # Optional (defaults to false).
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
    PUT /tasks/<task_id>: Update the 'completed' status of a task.
    Expected JSON format:
    {
        "completed": true/false
    }
    """
    update_data = request.get_json()
    for task in tasks:
        if task["id"] == task_id:
            if "completed" in update_data:
                task["completed"] = update_data["completed"]
            return jsonify(task), 200
    return jsonify({"error": "Task not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
