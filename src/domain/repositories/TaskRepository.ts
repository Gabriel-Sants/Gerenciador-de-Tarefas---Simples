import { Task } from '../entities/Task.js'

export interface TaskRepository {
    create(task: Task): Promise<void>
    findById(id: string): Promise<Task | null>
    findByUser(userId: string): Promise<Task[]>
    save(task: Task): Promise<void>
}
