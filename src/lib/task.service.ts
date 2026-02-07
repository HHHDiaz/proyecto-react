import axiosCliente  from "./axiosCliente";
import type { Task } from "../interfaces";


export const TaskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axiosCliente.get("/tasks");
    return response.data.data;

  },

  create: async (name: string): Promise<void> => {
    await axiosCliente.post("/tasks", { name });
  },

  update: async (id: number, name: string) => {
    await axiosCliente.put(`/tasks/${id}`, { name });
  },

  remove: async (id: number) => {
    await axiosCliente.delete(`/tasks/${id}`);
  },

  toggle: async (id: number, done: boolean) => {
    const response = await axiosCliente.patch(`/tasks/${id}`, { id, done });
    return response.data.data;
  },
};
