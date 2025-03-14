// tasksApi.ts - handles CRUD for tasks
export interface Task {
    id: number;
    title: string;
    status: "open" | "in progress" | "completed";
  }
  
  const API_URL = "http://localhost:5000";
  
  export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  }
  
  export async function addTask(title: string, status: Task["status"]): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status }),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  }
  
  export async function updateTask(taskId: number, updates: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  }
  