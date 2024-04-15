import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchPetProfileUseCase } from "../fetch-pet-profile"
import { InMemoryOrgRepository } from "@/repository/in-memory/in-memory-org-repository"
import { SetPetAsAdoptedUseCase } from "../set-pet-as-adopted"
import { makePet } from "./factory/make-pet.factory"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: SetPetAsAdoptedUseCase

describe('Set pet as adopted', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new SetPetAsAdoptedUseCase(petRepository)
  })

  it('should be able to set a pet as Adopted', async () => {
    const createdPet = await petRepository.create(makePet())

    const { pet } = await sut.execute({ petId: createdPet.id })
    expect(pet.isAvailable).toEqual(false)

  })
})