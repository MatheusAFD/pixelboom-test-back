import { db } from '../db'

export interface DashboardStatsResult {
  total: number
  active: number
  inactive: number
}

export async function dashboardStats(): Promise<DashboardStatsResult> {
  const total = await db.user.count({ where: { deletedAt: null } })
  const active = await db.user.count({
    where: { deletedAt: null, isActive: true },
  })
  const inactive = await db.user.count({
    where: { deletedAt: null, isActive: false },
  })
  return { total, active, inactive }
}
