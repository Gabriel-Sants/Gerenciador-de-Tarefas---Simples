import type { Request, Response } from 'express'
import { PrismaTaskRepository } from '../../infra/prisma/repositories/PrismaTaskRepository.js'
import { CreateTask } from '../../application/task/CreateTask.js'
import { ChangeTaskStatus } from '../../application/task/ChangeTaskStatus.js'
import { ListTasks } from '../../application/task/ListTasks.js'

const repository = new PrismaTaskRepository()

type taskParams = {
    id: string,
    userId: string
}

type UserParams = {
    userId: string
}

export class TaskController {
    static async create(req: Request, res: Response) {
        const useCase = new CreateTask(repository)
        const task = await useCase.execute(req.body)
        res.status(201).json(task)
    }

    static async changeStatus(req: Request<taskParams>, res: Response) {
        const useCase = new ChangeTaskStatus(repository)
        const task = await useCase.execute(req.params.id, req.body.status)
        res.json(task)
    }

    static async list(req: Request<taskParams>, res: Response) {
        const useCase = new ListTasks(repository)
        const tasks = await useCase.execute(req.params.userId)
        res.json(tasks)
    }

    static async listByUser(
        req: Request<UserParams>,
        res: Response
    ) {
        const useCase = new ListTasks(repository)
        const tasks = await useCase.execute(req.params.userId)

        res.json(tasks)
    }

}
