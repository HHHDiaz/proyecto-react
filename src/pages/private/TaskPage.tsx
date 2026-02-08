import { useEffect, useState } from "react";
import { TaskService } from "../../lib/task.service";
import type { Task } from "../../interfaces/task.interface";

export const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const response = await TaskService.getAll();

      if (response && Array.isArray(response)) {
        setTasks(response);
      } else if (Array.isArray(response)) {
        setTasks(response);
      } else {
        console.error("Formato inesperado:", response);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Gestión de Tareas</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const name = (form.elements.namedItem("title") as HTMLInputElement)
            .value;

          if (!name.trim()) return;

          await TaskService.create(name);
          await loadTasks();
          form.reset();
        }}
      >
        <input name="title" placeholder="Nueva tarea" />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tasks.length === 0 && <li>No hay tareas</li>}

        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration:
                task.done ? "line-through" : "none",
            }}
          >
            {task.name}

            <button
              onClick={async () => {
                await TaskService.toggle(
                  task.id,
                  !task.done
                );
                loadTasks();
              }}
            >
              {!task.done ? "Pendiente" : "Finalizada"}
            </button>

            <button
              onClick={async () => {
                const newName = prompt("Editar tarea", task.name);
                if (!newName?.trim()) return;
                await TaskService.update(task.id, newName);
                loadTasks();
              }}
            >
              Editar
            </button>

            <button
              onClick={async () => {
                await TaskService.remove(task.id);
                loadTasks();
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
