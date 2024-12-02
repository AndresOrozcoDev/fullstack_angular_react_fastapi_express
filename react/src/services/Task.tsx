import axios from "axios";


const api = axios.create({
  baseURL: process.env.FASTAPI_URL_API,
  headers: {
    API_KEY: process.env.FASTAPI_API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface Task {
  name: string;
  description: string;
  status: "" | "pendiente" | "progreso" | "completada";
}

const handleError = (error: any) => {
  console.error("API call error:", error);
  throw error;
};

export const getTasks = async () => {
  try {
    const response = await api.get(`/tasks`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const postTask = async (task: Task) => {
  try {
    const response = await api.post(`/tasks`, task);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const putTask = async (id: number, task: Task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
