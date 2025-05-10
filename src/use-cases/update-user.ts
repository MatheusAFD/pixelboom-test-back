import { db } from '../db'
import { User } from '@prisma/client'

export interface UpdateUserInput {
  name?: string
  email?: string
  phone?: string
  cpf?: string
  rg?: string
  isActive?: boolean
}

export type UpdateUserResult = User

export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<UpdateUserResult | null> {
  return db.user.update({
    where: { id },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  })
}
