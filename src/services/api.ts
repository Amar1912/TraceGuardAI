const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown server error" }));
      throw new Error(error.detail || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      console.warn(`Backend API unreachable at ${API_BASE_URL}${endpoint}. Ensure FastAPI server is running on port 8000.`);
      throw new Error(`Unable to connect to TraceGuardAI Backend API. Please ensure the backend server is running on port 8000.`);
    }
    throw error;
  }
}
