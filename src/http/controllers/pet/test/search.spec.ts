import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";
import { randomUUID } from "crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../utils/test/create-and-authenticate";


describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet by city', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const city = 'city A'
    const org = await prisma.org.create({ data: makeOrg({ city }) })
    await prisma.pet.create({
      data: {
        name: 'john',
        age: 5,
        breed: 'poodle',
        orgId: org.id,
      }
    })
    const response = await request(app.server).get('/pet').set('Authorization', `Bearer ${token}`)
      .query({ city, minAge: 2, maxAge: 5, breed: 'poodle', orgId: org.id })

    expect(response.statusCode).toEqual(201)
  })
})