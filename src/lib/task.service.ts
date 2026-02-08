import type { Task } from "../interfaces/task.interface";
import axiosClient from "./axiosCliente";

export const TaskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axiosClient.get("/tasks");
    return response.data.data;
  },

  create: async (name: string): Promise<void> => {
    await axiosClient.post("/tasks", { name });
  },

  update: async (id: number, name: string) => {
    await axiosClient.put(`/tasks/${id}`, { name });
  },

  remove: async (id: number) => {
    await axiosClient.delete(`/tasks/${id}`);
  },

  toggle: async (id: number, done: boolean) => {
    const response = await axiosClient.patch(`/tasks/${id}`, { id, done });
    return response.data.data;
  },
};
 export default TaskService;