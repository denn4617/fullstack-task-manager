// authApi.ts - handles user authentication (login, signUp)
export interface UserResponse {
    token: string;
    user: {
      name: string;
      profilePic: string;
    };
  }
  
  const API_URL = "http://localhost:5000";
  
  export async function login(username: string, password: string): Promise<UserResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  }
  
  export async function signUp(username: string, password: string, name: string): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, name }),
    });
    if (!res.ok) throw new Error("Sign up failed");
    return res.json();
  }
  