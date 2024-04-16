import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../utils/test/create-and-authenticate";
import { prisma } from "@/lib/prisma";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";


describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const org = await prisma.org.create({ data: makeOrg() })
    const response = await request(app.server)
      .post('/org/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'john',
        breed: 'poodle',
        age: 5,
        orgId: org.id
      })

    expect(response.statusCode).toEqual(201)
  })

  it('teste', async () => {
    const response = await request(app.server).get('/test').send()

    expect(response.statusCode).toEqual(222)
  })
})