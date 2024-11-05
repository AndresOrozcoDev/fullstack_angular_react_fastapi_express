import React, { Fragment, useState } from "react";
import './create-form.css'

interface Task {
    id: number
    name: string
    description: string
    status: "pendiente" | "en progreso" | "completada"
    createdAt: Date
  }
  
const Form = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt">>({
        name: "",
        description: "",
        status: "pendiente"
    })
    return (
        <Fragment>
            <h2 className="text-xl font-semibold mb-4 text-center">Crear Nueva Tarea</h2>
            <form className="space-y-4">
                <input
                    className="input w-full rounded-lg"
                    placeholder="Nombre de la tarea"
                />
                <textarea
                    className="input w-full rounded-lg"
                    placeholder="Descripción de la tarea"
                />
                <select className="input w-full rounded-lg">
                    <option></option>
                </select>
                <button className="w-full rounded-lg">Agregar Tarea</button>
            </form>
        </Fragment>
    )
}

export default Form;