import Fastify from 'fastify'
import { userController } from './controllers/user-controller'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'

const app = Fastify({ logger: true })

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'],
})
app.register(sensible)

app.register(async (fastify) => {
  fastify.register(userController, { prefix: '/api/users' })
})

const start = async () => {
  try {
    await app.listen({ port: 4000, host: '0.0.0.0' })
    console.log('Server running on http://localhost:4000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
