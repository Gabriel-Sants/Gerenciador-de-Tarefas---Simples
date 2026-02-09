import { http } from './http'
import type { Task } from '../types/Task'

export const TaskApi = {
  listByUser: (userId: string) => http.get<Task[]>(`/tasks/user/${userId}`),

  get: (id: string) => http.get<Task>(`/tasks/${id}`),

  create: (data: Partial<Task>) => http.post('/tasks', data),

  update: (id: string, data: Partial<Task>) => http.put(`/tasks/${id}`, data),

  changeStatus: (id: string, status: Task['status']) =>
    http.patch(`/tasks/${id}/status`, { status }),

  remove: (id: string) => http.delete(`/tasks/${id}`)
}
