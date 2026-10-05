const API_URL = "http://localhost:5001/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Something went wrong."
    );
  }

  return data;
}

export const authApi = {
  register: (credentials) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  login: (credentials) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};

export const taskApi = {
  list: () =>
    request("/tasks"),

  create: (task) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  update: (id, task) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  remove: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),
};