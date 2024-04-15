import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository";
import { RegisterOrgUseCase } from "../register-org";
import { OrgNameAlreadyExistsError } from "../errors/org-already-exists-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";


let orgRepository: InMemoryOrgRepository
let sut: RegisterOrgUseCase

describe('Register Org use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new RegisterOrgUseCase(orgRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Org Doe',
      address: '99 street',
      city: 'city',
      phone: '(99)9999-9999',
      password: '123456',
      cep: '888888-88',
      email: 'orgdoe@gmail.com'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register the same name twice', async () => {
    const name = 'Org Doe'

    await sut.execute({
      name,
      phone: '(99)9999-9999',
      address: '99 street',
      city: 'city',
      password: '123456',
      cep: '888888-88',
      email: 'orgdoe@gmail.com'
    })
    await expect(() =>
      sut.execute({
        name,
        phone: '(99)9999-9999',
        address: '99 street',
        city: 'city',
        password: '123456',
        cep: '888888-88',
        email: 'orgdoe2@gmail.com'
      }),).rejects.toBeInstanceOf(OrgNameAlreadyExistsError)
  })
  it('should not be able to register the same email twice', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      name: 'Org Doe1',
      phone: '(99)9999-9999',
      address: '99 street',
      city: 'city',
      password: '123456',
      cep: '888888-88',
      email
    })
    await expect(() =>
      sut.execute({
        name: 'Org Doe2',
        phone: '(99)9999-9999',
        address: '99 street',
        city: 'city',
        password: '123456',
        cep: '888888-88',
        email
      }),).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

})

