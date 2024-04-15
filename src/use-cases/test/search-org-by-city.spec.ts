import { beforeEach, describe, expect, it } from "vitest"
import { SearchOrgByCityUseCase } from "../search-org-by-city"
import { hash } from "bcryptjs"
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository"

let orgRepository: InMemoryOrgRepository
let sut: SearchOrgByCityUseCase

describe('Search Org by city', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new SearchOrgByCityUseCase(orgRepository)
  })

  it('should be able to search Org by city', async () => {
    const city = 'city A'

    await orgRepository.create({
      name: 'Org Doe1',
      phone: '(99)9999-9999',
      address: '99 street',
      city,
      password_hash: await hash('123456', 6),
      cep: '888888-88',
      email: 'johndoe@teste.com'
    })
    await orgRepository.create({
      name: 'Org Doe1',
      phone: '(99)9999-9999',
      address: '99 street',
      city: 'city B',
      password_hash: await hash('123456', 6),
      cep: '888888-88',
      email: 'johndoe@teste.com'
    })


    const { org } = await sut.execute({ city })
    expect(org).toHaveLength(1)
    expect(org).toEqual([expect.objectContaining({ city })])
  })
})