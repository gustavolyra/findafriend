import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";


describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoeorg@test.com'
    const password = '123456'

    await request(app.server).post('/org').send(makeOrg({ email, password }))

    const response = await request(app.server).post('/sessions').send({
      email, password
    })

    expect(response.statusCode).toEqual(400)
  })
})