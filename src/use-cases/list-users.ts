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
  if (startDate) where.createdAt = { gte: new Date(startDate) }
  if (endDate)
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(endDate) }

  let data: User[] = []
  let totalItems = 0

  if (search) {
    const all = await db.user.findMany({
      where: {
        deletedAt: null,
        ...(startDate && { createdAt: { gte: new Date(startDate) } }),
        ...(endDate && { createdAt: { lte: new Date(endDate) } }),
      },
      orderBy: { createdAt: 'desc' },
    })
    data = all.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    )
    totalItems = data.length
    data = data.slice((page - 1) * limit, (page - 1) * limit + limit)
  } else {
    totalItems = await db.user.count({ where })
    data = await db.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })
  }
  return { data, totalItems }
}
