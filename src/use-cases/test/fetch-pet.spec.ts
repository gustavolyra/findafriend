import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository"
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository"
import { makePet } from "./factory/make-pet.factory"
import { makeOrg } from "./factory/make-org.factory"
import { FetchPetUseCase } from "../fetch-pet"

let orgsRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: FetchPetUseCase

describe('Fetch Pet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgsRepository)
    sut = new FetchPetUseCase(petRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const org1 = await orgsRepository.create(makeOrg({ city: 'city A' }))
    const org2 = await orgsRepository.create(makeOrg({ city: 'city B' }))


    const pet1 = await petRepository.create(makePet({ orgId: org1.id }))
    const pet2 = await petRepository.create(makePet({ orgId: org1.id }))

    const pet3 = await petRepository.create(makePet({ orgId: org2.id }))
    const { pets } = await sut.execute({ city: org1.city })
    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by city and breed', async () => {
    const breed = 'poodle'
    const org1 = await orgsRepository.create(makeOrg({ city: 'city A' }))
    const org2 = await orgsRepository.create(makeOrg({ city: 'city B' }))

    await petRepository.create(makePet({ orgId: org1.id, breed }))
    await petRepository.create(makePet({ orgId: org1.id, breed }))
    await petRepository.create(makePet({ orgId: org1.id }))

    await petRepository.create(makePet({ orgId: org2.id, breed }))
    const { pets } = await sut.execute({ city: org1.city, breed })
    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by city and age', async () => {
    const org1 = await orgsRepository.create(makeOrg({ city: 'city A' }))
    const org2 = await orgsRepository.create(makeOrg({ city: 'city B' }))

    await petRepository.create(makePet({ orgId: org1.id, age: 5 }))
    await petRepository.create(makePet({ orgId: org1.id, age: 4 }))
    await petRepository.create(makePet({ orgId: org1.id, age: 3 }))
    await petRepository.create(makePet({ orgId: org1.id, age: 8 }))

    await petRepository.create(makePet({ orgId: org2.id }))

    const { pets } = await sut.execute({ city: org1.city, maxAge: 5, minAge: 3 })
    expect(pets).toHaveLength(3)
  })

  it('should be able to fetch pets by city, age and breed', async () => {
    const breed = 'poodle'
    const org1 = await orgsRepository.create(makeOrg({ city: 'city A' }))
    const org2 = await orgsRepository.create(makeOrg({ city: 'city B' }))

    await petRepository.create(makePet({ orgId: org1.id, age: 5, breed }))
    await petRepository.create(makePet({ orgId: org1.id, age: 4, breed }))
    await petRepository.create(makePet({ orgId: org1.id, age: 3, breed: 'bulldog' }))
    await petRepository.create(makePet({ orgId: org1.id, age: 8 }))

    await petRepository.create(makePet({ orgId: org2.id }))

    const { pets } = await sut.execute({ city: org1.city, maxAge: 5, minAge: 3, breed })

    expect(pets).toHaveLength(2)
  })
})