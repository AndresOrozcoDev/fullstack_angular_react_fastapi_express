import React from "react";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react"

interface Task {
    id: number;
    name: string;
    description: string;
    status: "pendiente" | "en progreso" | "completada";
    createdAt: Date;
}

interface CardListProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ tasks, onEditTask, onDeleteTask }) => {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{task.name}</h3>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-sm text-gray-500">Creada el: {task.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => onEditTask(task)} className="bg-white shadow-md rounded-lg p-4">
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => onDeleteTask(task.id)} className="bg-white shadow-md rounded-lg p-4">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-sm font-medium mr-2">Estado:</span>
                        {task.status === "pendiente" && <XCircle className="h-5 w-5 text-yellow-500" />}
                        {task.status === "en progreso" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        {task.status === "completada" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        <span className="ml-1 text-sm capitalize">{task.status}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardList;