import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'API_KEY': 'dev',
    'Accept': 'application/json',
  },
});

interface Task {
  name: string;
  description: string;
  status: "pendiente" | "en progreso" | "completada";
}

const handleError = (error: any) => {
  console.error('API call error:', error);
  throw error;
};

export const getTasks = async ()  => {
  try {
    const response = await api.get(`/task`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const postTask = async (task: Task) => {
  try {
    const response = await api.post(`/task`, task);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const deleteTask = async (id: number) => {
  try {
    const response = await api.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
