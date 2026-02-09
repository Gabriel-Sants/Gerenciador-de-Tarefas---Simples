import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
import { adapter } from '../adapters/postgresAdapter.js'
import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient({ adapter })

export { prisma }

