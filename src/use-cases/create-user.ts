import { db } from '../db'
import { User } from '@prisma/client'

export interface CreateUserInput {
  name: string
  email: string
  phone: string
  cpf: string
  rg: string
  isActive?: boolean
  phoneIsWhatsapp?: boolean
}

export type CreateUserResult = User

export async function createUser(
  input: CreateUserInput
): Promise<CreateUserResult> {
  return db.user.create({
    data: {
      ...input,
      isActive: input.isActive ?? true,
      phoneIsWhatsapp: input.phoneIsWhatsapp ?? true,
    },
  })
}
