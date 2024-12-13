import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_URL_API,
  headers: {
    API_KEY: process.env.REACT_APP_FASTAPI_API_KEY,
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
  showToast(error.message, "error");
  throw error;
};

const showToast = (message: string, type: "success" | "warning" | "error") => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const getTasks = async () => {
  try {
    const response = await api.get(`/tasks`);
    showToast(response.data.message, "success");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const postTask = async (task: Task) => {
  try {
    const response = await api.post(`/tasks`, task);
    showToast(response.data.message, "success");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const putTask = async (id: number, task: Task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    showToast(response.data.message, "success");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    showToast(response.data.message, "success");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
