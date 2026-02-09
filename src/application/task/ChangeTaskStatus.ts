import type { TaskRepository } from '../../domain/repositories/TaskRepository.js'
import { TaskStatus } from '../../domain/enums/TaskStatus.js'

export class ChangeTaskStatus {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: string, status: TaskStatus) {
        const task = await this.taskRepository.findById(taskId)

        if (!task) {
            throw new Error('Tarefa não encontrada')
        }

        task.changeStatus(status)
        await this.taskRepository.save(task)

        return task
    }
}
