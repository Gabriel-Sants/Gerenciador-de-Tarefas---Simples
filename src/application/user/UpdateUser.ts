import type { UserRepository } from '../../domain/repositories/UserRepository.js'

interface Input {
  id: string
  name?: string
  email?: string
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input) {
    const user = await this.userRepository.findById(input.id)
    if (!user) throw new Error('Usuário não encontrado')

    if (input.name) user.name = input.name
    if (input.email) user.email = input.email

    await this.userRepository.save(user)
    return user
  }
}
