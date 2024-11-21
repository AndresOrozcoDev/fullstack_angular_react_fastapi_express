import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CardList from "./components/CardList";
import CreateForm from "./components/CreateForm";
import { getTasks, postTask, deleteTask, putTask } from "./services/Task";

interface Task {
  name: string;
  description: string;
  status: "pendiente" | "progreso" | "completada";
}

interface TaskCreated {
  id: number;
  name: string;
  description: string;
  status: "pendiente" | "progreso" | "completada";
  created: string;
}

function App() {
  const [tasks, setTasks] = useState<TaskCreated[]>([]);
  const [editingTask, setEditingTask] = useState<TaskCreated | null>(null);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    description: "",
    status: "pendiente",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.log("Error al obtener tareas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAddTask = async (task: Task) => {
    setIsLoading(true);
    try {
      if (editingTask) {
        await putTask(editingTask.id, task);
      } else {
        await postTask(task);
      }
      await fetchData();
      setEditingTask(null);
    } catch (error) {
      console.log("Error agregando o actualizando tarea", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteTask = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteTask(id);
      await fetchData();
    } catch (error) {
      console.log("Error eliminando la tarea", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (task: TaskCreated) => {
    setEditingTask(task);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {isLoading && (
        <div className="bg-loader">
          <div className="loader-text">Loading...</div>
        </div>
      )}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Gestor de Tareas</h1>
        <CreateForm task={editingTask} onAddTask={onAddTask} />
        <CardList
          tasks={tasks}
          onEditTask={startEditing}
          onDeleteTask={deleteTask}
        />
      </div>
    </Fragment>
  );
}

export default App;
