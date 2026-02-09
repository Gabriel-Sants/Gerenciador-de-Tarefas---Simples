import type { UserRepository } from '../../domain/repositories/UserRepository.js'

export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll()
  }
}
