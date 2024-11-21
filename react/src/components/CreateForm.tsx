import React, { useState, useEffect } from "react";

interface Task {
    name: string;
    description: string;
    status: "pendiente" | "en progreso" | "completada";
}

interface CreateFormProps {
    task: Task | null;
    onAddTask: (task: Task) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ task, onAddTask }) => {
    const [newTask, setNewTask] = useState<Task>({
        name: "",
        description: "",
        status: "pendiente"
    });

    useEffect(() => {
        if (task) {
            setNewTask({
                name: task.name,
                description: task.description,
                status: task.status
            });
        }
    }, [task]); // Solo cuando la tarea cambia (cuando se selecciona una tarea para editar)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(newTask);  // Al enviar el formulario, se llama a onAddTask para crear o actualizar
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
                {task ? "Editar Tarea" : "Crear Nueva Tarea"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    placeholder="Nombre de la tarea"
                    value={newTask.name}
                    type="text"
                    required
                    className="input w-full rounded-lg"
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                />
                <textarea
                    placeholder="Descripción de la tarea"
                    value={newTask.description}
                    required
                    className="input w-full rounded-lg"
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <select
                    value={newTask.status}
                    className="input w-full rounded-lg"
                    required
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as "pendiente" | "en progreso" | "completada" })}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <input type="submit" value={task ? "Actualizar Tarea" : "Agregar Tarea"} className="button w-full rounded-lg" />
            </form>
        </div>
    );
};

export default CreateForm;
