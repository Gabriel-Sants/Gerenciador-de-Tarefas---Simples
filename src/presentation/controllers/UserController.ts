import type { Request, Response } from 'express'
import { PrismaUserRepository } from '../../infra/prisma/repositories/PrismaUserRepository.js'
import { CreateUser } from '../../application/user/CreateUser.js'
import { GetUser } from '../../application/user/GetUser.js'
import { ListUsers } from '../../application/user/ListUsers.js'
import { UpdateUser} from '../../application/user/UpdateUser.js'
import { DeleteUser} from '../../application/user/DeleteUser.js'

const repository = new PrismaUserRepository()

type UserParams = {
  id: string
}

export class UserController {
  
  static async create(req: Request, res: Response) {
    const useCase = new CreateUser(repository)
    const user = await useCase.execute(req.body)
    res.status(201).json(user)
  }

  static async get(req: Request<UserParams>, res: Response) {
    const useCase = new GetUser(repository)
    const user = await useCase.execute(req.params.id)
    res.json(user)
  }

  static async list(_: Request, res: Response) {
    const useCase = new ListUsers(repository)
    const users = await useCase.execute()
    res.json(users)
  }

  static async update(req: Request<UserParams>, res: Response) {
    const useCase = new UpdateUser(repository)
    const user = await useCase.execute({ id: req.params.id, ...req.body })
    res.json(user)
  }

  static async delete(req: Request<UserParams>, res: Response) {
    const useCase = new DeleteUser(repository)
    await useCase.execute(req.params.id)
    res.status(204).send()
  }
}
