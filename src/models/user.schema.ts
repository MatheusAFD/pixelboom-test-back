import { z } from 'zod'

export const userCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  cpf: z.string().min(11).max(14),
  rg: z.string().min(5),
  isActive: z.boolean().optional(),
  phoneIsWhatsapp: z.boolean().optional(),
})

export const userUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional(),
  cpf: z.string().min(11).max(14).optional(),
  rg: z.string().min(5).optional(),
  isActive: z.boolean().optional(),
  phoneIsWhatsapp: z.boolean().optional(),
})

export const userListQuerySchema = z.object({
  limit: z.string().default('10').transform(Number),
  page: z.string().default('1').transform(Number),
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})
