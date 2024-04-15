import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchPetProfileUseCase } from "../fetch-pet-profile"
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: FetchPetProfileUseCase

describe('Fecth Pet Profile use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new FetchPetProfileUseCase(petRepository)
  })

  it('should be able to retrieve pet information', async () => {
    const petName = 'John Doe'
    const createdPet = await petRepository.create({
      name: petName,
      breed: 'poodle',
      age: 5,
      orgId: 'org-01'
    })

    const { pet } = await sut.execute({ petId: createdPet.id })
    expect(pet.name).toEqual(petName)
  })
})