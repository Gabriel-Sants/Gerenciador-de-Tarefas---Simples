import type { TaskRepository } from '../../domain/repositories/TaskRepository.js'
import { Task } from '../../domain/entities/Task.js'
import { TaskPriority } from '../../domain/enums/TaskPriority.js'
import { TaskStatus } from '../../domain/enums/TaskStatus.js'
import { randomUUID } from 'crypto'

interface Input {
    title: string
    description?: string
    priority: TaskPriority
    userId: string
}

export class CreateTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(input: Input) {
        const task = new Task(
            randomUUID(),
            input.title,
            input.description ?? null,
            TaskStatus.PENDENTE,
            input.priority,
            input.userId,
            new Date(),
            null
        )

        await this.taskRepository.create(task)
        return task
    }
}
