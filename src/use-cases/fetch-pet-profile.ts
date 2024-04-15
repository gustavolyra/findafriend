import { PetRepository } from "@/repository/pet-repository"
import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface FetchPetProfileUseCaseRequest {
  petId: string
}

interface FetchPetProfileUseCaseResponse {
  pet: Pet
}

export class FetchPetProfileUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    petId }: FetchPetProfileUseCaseRequest): Promise<FetchPetProfileUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}