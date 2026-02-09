import type { UserRepository } from '../../domain/repositories/UserRepository.js'
import { User } from '../../domain/entities/User.js'
import { randomUUID } from 'crypto'

interface Input {
  name: string
  email: string
  password: string
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}
 
  async execute(input: Input) {
    const existing = await this.userRepository.findByEmail(input.email)
    console.log('submit disparou');
    if (existing) {
      throw new Error('Email já em uso')
    }

    const user = new User(
      randomUUID(),
      input.name,
      input.email,
      input.password,
      true,
      new Date()
    )

    await this.userRepository.create(user)
    return user
  }
}
