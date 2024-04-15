import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository"
import { RegisterPetUseCase } from "../register-pet"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: RegisterPetUseCase

describe('Register Pet use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new RegisterPetUseCase(petRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe',
      breed: 'poodle',
      age: 12,
      orgId: 'org-01'
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})