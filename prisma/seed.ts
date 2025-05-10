import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  await db.user.deleteMany({})
  const now = new Date()
  await db.user.createMany({
    data: Array.from({ length: 15 }).map((_, i) => ({
      name: `Usuário ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `119999900${String(i + 1).padStart(2, '0')}`,
      cpf: `0000000000${i + 1}`.slice(-11),
      rg: `MG-10${i + 1}`,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })),
  })
  console.log('Seed concluído com 15 usuários.')
}

main().then(() => db.$disconnect())
