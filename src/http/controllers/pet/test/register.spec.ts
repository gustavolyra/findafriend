import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../utils/test/create-and-authenticate";


describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server).post('/pet').set('Authorization', `Bearer ${token}`).send({
      name: 'john',
      breed: 'poodle',
      age: 5
    })

    expect(response.statusCode).toEqual(201)
  })
})