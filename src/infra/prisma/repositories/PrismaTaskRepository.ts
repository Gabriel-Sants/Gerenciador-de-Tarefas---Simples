import type { TaskRepository } from '../../../domain/repositories/TaskRepository.js'
import { Task } from '../../../domain/entities/Task.js'
import { prisma } from '../prisma.js'

export class PrismaTaskRepository implements TaskRepository {
    async create(task: Task): Promise<void> {
        await prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                userId: task.userId,
                completedAt: task.completedAt
            }
        })

    }

    async findById(id: string): Promise<Task | null> {
        const data = await prisma.task.findUnique({ where: { id } })
        if (!data) return null

        return new Task(
            data.id,
            data.title,
            data.description,
            data.status,
            data.priority,
            data.userId,
            data.createdAt,
            data.completedAt
        )
    }

    async findByUser(userId: string): Promise<Task[]> {
        const tasks = await prisma.task.findMany({ where: { userId } })
        return tasks.map(
            t =>
                new Task(
                    t.id,
                    t.title,
                    t.description,
                    t.status,
                    t.priority,
                    t.userId,
                    t.createdAt,
                    t.completedAt
                )
        )
    }

    async save(task: Task): Promise<void> {
        await prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                completedAt: task.completedAt
            }
        })
    }
}
