import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { makeOrg } from "@/use-cases/test/factory/make-org.factory";


describe('Refresh Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const email = 'johndoeorg@test.com'
    const password = '123456'

    await request(app.server).post('/org').send({
      name: 'Org Doe1',
      phone: '(99)9999-9999',
      address: '99 street',
      city: 'city',
      password,
      cep: '888888-88',
      email
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email, password
    })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) throw new Error("No cookies!")

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})