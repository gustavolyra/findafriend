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

    const response = await request(app.server).post('/org').send(makeOrg())

    expect(response.statusCode).toEqual(201)
  })
})