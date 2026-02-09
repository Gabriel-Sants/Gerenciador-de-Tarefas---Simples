export interface Task {
  id: string
  title: string
  description?: string
  status: 'PENDENTE' | 'EM_PROGRESSO' | 'FEITO' | 'ARQUIVADO'
  priority: 'BAIXO' | 'MEDIO' | 'ALTO'
  userId: string
}
