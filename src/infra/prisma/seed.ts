import { adapter } from '../adapters/postgresAdapter.js'
import { PrismaClient } from '../generated/prisma/client.js'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient({adapter})

async function main() {
  console.log('Seeding database...')

  // Limpando dados (ordem importa por causa das FK)
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  // Criando usuários
  const user1 = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Foo Bar',
      email: 'foobar@email.com',
      password: 'hashed_password_123',
      active: true,
      createdAt: new Date()
    }
  })

  const user2 = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Maria Silva',
      email: 'maria@email.com',
      password: 'hashed_password_456',
      active: true,
      createdAt: new Date()
    }
  })

  // Criando tarefas
  await prisma.task.createMany({
    data: [
      {
        id: randomUUID(),
        title: 'Estudar SOLID',
        description: 'Aplicar SOLID em projeto Express',
        status: 'PENDENTE',
        priority: 'ALTO',
        userId: user1.id,
        createdAt: new Date(),
        completedAt: null
      },
      {
        id: randomUUID(),
        title: 'Criar seeds',
        description: 'Criar seed de User e Task',
        status: 'EM_PROGRESSO',
        priority: 'MEDIO',
        userId: user1.id,
        createdAt: new Date(),
        completedAt: null
      },
      {
        id: randomUUID(),
        title: 'Testar API',
        description: 'Testar endpoints no Insomnia/Postman',
        status: 'FEITO',
        priority: 'BAIXO',
        userId: user2.id,
        createdAt: new Date(),
        completedAt: new Date()
      }
    ]
  })

  console.log('Seed finalizado com sucesso')
}

main()
  .catch((e) => {
    console.error('Erro ao rodar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
