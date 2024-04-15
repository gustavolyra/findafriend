import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '../authenticate'
import { InMemoryOrgRepository } from '@/repository/in-memory/in-memory-org-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateUseCase(orgRepository)

    await orgRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(99)99999-9999',
      address: '99st street',
      city: 'test',
      cep: '888888-88',
    })
  })

  it('should be able to authenticate', async () => {


    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
