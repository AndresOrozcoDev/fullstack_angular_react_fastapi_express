import React, { useState, useEffect } from "react";

interface CreateFormProps {
    task: Omit<Task, "id" | "createdAt"> | null;
    onAddOrUpdateTask: (task: Omit<Task, "id" | "createdAt">) => void;
}

interface Task {
    id: number;
    name: string;
    description: string;
    status: "pendiente" | "en progreso" | "completada";
    createdAt: Date;
}

const CreateForm: React.FC<CreateFormProps> = ({ task, onAddOrUpdateTask }) => {
    const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt">>({
        name: "",
        description: "",
        status: "pendiente"
    });

    // Cargar los datos de la tarea si estamos editando una
    useEffect(() => {
        if (task) {
            setNewTask(task);
        }
    }, [task]);

    const handleSubmit = () => {
        onAddOrUpdateTask(newTask);
        setNewTask({ name: "", description: "", status: "pendiente" });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-center">{task ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
            <div className="space-y-4">
                <input
                    placeholder="Nombre de la tarea"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    type="text"
                    className="input w-full rounded-lg"
                />
                <textarea
                    placeholder="Descripción de la tarea"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="input w-full rounded-lg"
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as "pendiente" | "en progreso" | "completada" })}
                    className="input w-full rounded-lg"
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <button onClick={handleSubmit} className="button w-full rounded-lg">
                    {task ? "Actualizar Tarea" : "Agregar Tarea"}
                </button>
            </div>
        </div>
    );
}

export default CreateForm;
