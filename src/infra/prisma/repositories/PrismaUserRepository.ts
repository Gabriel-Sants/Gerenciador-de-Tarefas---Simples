import type { UserRepository } from '../../../domain/repositories/UserRepository.js'
import { User } from '../../../domain/entities/User.js'
import { prisma } from '../prisma.js'

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: { ...user }
    })
  }

  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { id } })
    return data
      ? new User(
          data.id,
          data.name,
          data.email,
          data.password,
          data.active,
          data.createdAt
        )
      : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { email } })
    return data
      ? new User(
          data.id,
          data.name,
          data.email,
          data.password,
          data.active,
          data.createdAt
        )
      : null
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users.map(
      u =>
        new User(
          u.id,
          u.name,
          u.email,
          u.password,
          u.active,
          u.createdAt
        )
    )
  }

  async save(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        active: user.active
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
