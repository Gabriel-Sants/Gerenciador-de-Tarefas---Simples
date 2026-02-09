import type { TaskRepository } from '../../domain/repositories/TaskRepository.js'

export class ListTasks {
    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string) {
        return this.taskRepository.findByUser(userId)
    }
}
