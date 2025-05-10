import { db } from '../db'
import { User } from '@prisma/client'

export type GetUserByIdResult = User | null

export async function getUserById(id: string): Promise<GetUserByIdResult> {
  return db.user.findUnique({ where: { id } })
}
