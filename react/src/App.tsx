import React, { useState} from 'react';
import './App.css';
import CardList from './components/CardList';
import CreateForm from './components/CreateForm';

interface Task {
  id: number;
  name: string;
  description: string;
  status: "pendiente" | "en progreso" | "completada";
  createdAt: Date;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addOrUpdateTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...editingTask, ...newTask } : task)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now(), createdAt: new Date() }]);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Gestor de Tareas</h1>
      <CreateForm task={editingTask} onAddOrUpdateTask={addOrUpdateTask} />
      <CardList tasks={tasks} onEditTask={startEditing} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
