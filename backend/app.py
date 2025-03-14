"""
app.py - Flask API for the Task Manager

"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# In-memory store of users
users = [
    {
        "username": "admin",
        "password_hash": generate_password_hash("secret"),
        "name": "Dennis Kilic",
        "profilePic": "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
    }
]

# In-memory store of tasks
tasks = [
    {"id": 1, "title": "Study", "status": "in progress"},
    {"id": 2, "title": "Do the Dishes", "status": "open"},
    {"id": 3, "title": "Exercise", "status": "completed"},
]


@app.route("/signup", methods=["POST"])
def signup():
    """
    POST /signup
    Expects JSON: { "username": ..., "password": ..., "name": ... }
    Returns: { "message": "User created" } or error
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    name = data.get("name")

    if not username or not password or not name:
        return jsonify({"error": "Missing fields"}), 400

    # Check if username already exists
    for u in users:
        if u["username"] == username:
            return jsonify({"error": "Username already taken"}), 400

    new_user = {
        "username": username,
        "password": password,
        "name": name,
        "profilePic": "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
    }
    users.append(new_user)
    return jsonify({"message": "User created"}), 201


@app.route("/login", methods=["POST"])
def login():
    """
    POST /login
    Expects JSON with "username" and "password".
    Returns a dummy token and user info if credentials are valid.
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    found_user = None
    for u in users:
        if u["username"] == username and check_password_hash(u["password_hash"], password):
            found_user = u
            break

    if found_user:
        return jsonify({
            "token": "dummy-token",
            "user": {
                "name": found_user["name"],
                "profilePic": found_user["profilePic"]
            }
        }), 200
    else:
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
        "status": "open"|"in progress"|"completed"
    }
    """
    data = request.get_json()
    if "title" not in data:
        return jsonify({"error": "Task title is required"}), 400

    new_id = tasks[-1]["id"] + 1 if tasks else 1
    status = data.setdefault("status", "open")
    new_task = {
        "id": new_id,
        "title": data["title"],
        "status": status
    }
    tasks.append(new_task)
    return jsonify(new_task), 201


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    """
    PUT /tasks/<task_id>
    JSON: { "title": ..., "status": "open"|"in progress"|"completed" }
    """
    data = request.get_json()
    for t in tasks:
        if t["id"] == task_id:
            if "status" in data:
                t["status"] = data["status"]
            return jsonify(t), 200
    return jsonify({"error": "Task not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
