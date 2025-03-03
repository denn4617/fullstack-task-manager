// api.ts - Module to interact with the Flask API.

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "http://localhost:5000";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

export async function addTask(title: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to add task");
  return response.json();
}

export async function updateTask(taskId: number, completed: boolean): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
}

export async function login(username: string, password: string): Promise<{ token: string; username: string }> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
}
