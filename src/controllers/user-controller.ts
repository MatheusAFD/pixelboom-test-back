import { FastifyInstance } from 'fastify'
import {
  userCreateSchema,
  userUpdateSchema,
  userListQuerySchema,
} from '../models/user.schema'
import { listUsers } from '../use-cases/list-users'
import { getUserById } from '../use-cases/get-user-by-id'
import { createUser } from '../use-cases/create-user'
import { updateUser } from '../use-cases/update-user'
import { softDeleteUser } from '../use-cases/soft-delete-user'
import { dashboardStats } from '../use-cases/dashboard-stats'

export async function userController(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    const query = userListQuerySchema.parse(request.query)
    const result = await listUsers(query)
    return reply.send(result)
  })

  fastify.get('/:id', async (request, reply) => {
    const id = String((request.params as any).id)
    const user = await getUserById(id)
    if (!user) return reply.code(404).send({ message: 'User not found' })
    return reply.send(user)
  })

  fastify.post('/', async (request, reply) => {
    const data = userCreateSchema.parse(request.body)
    const user = await createUser({ ...data, isActive: data.isActive ?? true })
    return reply.code(201).send(user)
  })

  fastify.put('/:id', async (request, reply) => {
    const id = String((request.params as any).id)
    const data = userUpdateSchema.parse(request.body)
    const user = await updateUser(id, data)
    if (!user) return reply.code(404).send({ message: 'User not found' })
    return reply.send(user)
  })

  fastify.delete('/:id', async (request, reply) => {
    const id = String((request.params as any).id)
    const user = await softDeleteUser(id)
    if (!user) return reply.code(404).send({ message: 'User not found' })
    return reply.send({ message: 'User deleted' })
  })

  fastify.get('/dashboard/stats', async (_request, reply) => {
    const stats = await dashboardStats()
    return reply.send(stats)
  })
}
