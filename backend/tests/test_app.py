import unittest
import json
from app import app, tasks


class TaskManagerTestCase(unittest.TestCase):
    def setUp(self):
        # Set up test client and ensure we start with a known state.
        self.app = app.test_client()
        self.app.testing = True
        global tasks
        tasks[:] = [
            {"id": 1, "title": "Test Task 1", "completed": False},
            {"id": 2, "title": "Test Task 2", "completed": True},
        ]

    def test_get_tasks(self):
        response = self.app.get("/tasks")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)

    def test_add_task(self):
        new_task = {"title": "New Task"}
        response = self.app.post("/tasks", json=new_task)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data["title"], "New Task")
        self.assertFalse(data["completed"])

    def test_add_task_without_title(self):
        response = self.app.post("/tasks", json={})
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)


if __name__ == "__main__":
    unittest.main()
