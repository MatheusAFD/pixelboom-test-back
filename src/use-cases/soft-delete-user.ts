import { db } from '../db'
import { User } from '@prisma/client'

export type SoftDeleteUserResult = User | null

export async function softDeleteUser(
  id: string
): Promise<SoftDeleteUserResult> {
  return db.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
}
