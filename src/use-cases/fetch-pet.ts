import { Pet } from "@prisma/client"
import { PetRepository } from "@/repository/pet-repository"

interface FetchPetUseCaseRequest {
  maxAge?: number
  minAge?: number
  city: string
  breed?: string
  orgId?: string
}

interface FetchPetUseCaseResponse {
  pets: Pet[]
}

export class FetchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    maxAge, minAge, city, breed, orgId
  }: FetchPetUseCaseRequest): Promise<FetchPetUseCaseResponse> {

    const pets = await this.petRepository.findAll({
      maxAge, minAge, city, breed, orgId
    })

    return { pets }
  }
}