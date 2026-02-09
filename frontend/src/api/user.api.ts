import { http } from './http'
import type { User } from '../types/User'

export const UserApi = {
  list: () => http.get<User[]>('/users'),
  get: (id: string) => http.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => http.post('/users', data),
  update: (id: string, data: Partial<User>) =>
    http.put(`/users/${id}`, data),
  remove: (id: string) => http.delete(`/users/${id}`)
}
