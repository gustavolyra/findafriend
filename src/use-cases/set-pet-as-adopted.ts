import { PetRepository } from "@/repository/pet-repository"
import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface SetPetAsAdoptedUseCaseRequest {
  petId: string
}

interface SetPetAsAdoptedUseCaseResponse {
  pet: Pet
}

export class SetPetAsAdoptedUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    petId }: SetPetAsAdoptedUseCaseRequest): Promise<SetPetAsAdoptedUseCaseResponse> {
    if (!await this.petRepository.findById(petId)) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.setAsAdopted(petId)
    if (!pet) throw new ResourceNotFoundError()

    return { pet }
  }
}