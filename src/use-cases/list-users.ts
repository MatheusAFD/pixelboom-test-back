import { db } from '../db'
import { User } from '@prisma/client'

export interface ListUsersParams {
  limit: number
  page: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface ListUsersResult {
  data: User[]
  totalItems: number
}

export async function listUsers({
  limit,
  page,
  search,
  startDate,
  endDate,
}: ListUsersParams): Promise<ListUsersResult> {
  const where: any = {
    deletedAt: null,
  }
  if (search) {
    where.AND = [
      db.$queryRaw`LOWER(name) LIKE '%' || ${search.toLowerCase()} || '%'`
    ]
  }
  if (startDate) where.createdAt = { gte: new Date(startDate) }
  if (endDate)
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(endDate) }

  const totalItems = await db.user.count({ where })
  const data = await db.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })
  return { data, totalItems }
}
