import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../utils/test/create-and-authenticate";
import { makePet } from "@/use-cases/test/factory/make-pet.factory";
import { randomUUID } from "node:crypto";


describe('Adopted Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able set a pet as Adopted', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const org = await prisma.org.create({ data: makeOrg() })
    const pet = await prisma.pet.create({
      data: {
        id: randomUUID(),
        name: 'John',
        age: 1,
        created_at: new Date(),
        breed: 'poodle',
        isAvailable: true,
        orgId: org.id,
      }
    })
    const response = await request(app.server).post(`/pet/${pet.id}/adopted`).set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})