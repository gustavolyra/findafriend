import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
) {
  await prisma.org.create({
    data: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password_hash: await hash('123456', 6),
      phone: '999999',
      city: 'city A',
      cep: '88888-88',
      address: '1st street'
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })
  const { token } = authResponse.body
  return {
    token,
  }
}