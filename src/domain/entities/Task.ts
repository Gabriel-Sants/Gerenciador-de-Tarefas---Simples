import { TaskStatus } from '../enums/TaskStatus.js'
import { TaskPriority } from '../enums/TaskPriority.js'

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: string,
    public priority: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public completedAt: Date | null
  ) {}

  changeStatus(newStatus: string) {
    if (this.status === 'ARQUIVADO') throw new Error('Tarefas arquivadas não podem ter seu status alterado.')
    if (this.status === 'FEITO' && newStatus !== 'ARQUIVADO')
      throw new Error('As tarefas concluídas só podem ser arquivadas')
    if (newStatus === 'FEITO') this.completedAt = new Date()
    this.status = newStatus
  }
}