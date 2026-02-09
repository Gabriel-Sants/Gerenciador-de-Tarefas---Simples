import type { UserRepository } from '../../domain/repositories/UserRepository.js'

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error('Usuário não encontrado')
    return user
  }
}
