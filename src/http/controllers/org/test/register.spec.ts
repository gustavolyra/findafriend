import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";


describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {

    const response = await request(app.server).post('/org').send({
      name: 'Org Doe1',
      phone: '(99)9999-9999',
      address: '99 street',
      city: 'city',
      password: '123456',
      cep: '888888-88',
      email: 'test@test.com'
    })

    expect(response.statusCode).toEqual(201)
  })
})