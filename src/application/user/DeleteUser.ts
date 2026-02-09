import type { UserRepository } from '../../domain/repositories/UserRepository.js'

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    await this.userRepository.delete(id)
  }
}
