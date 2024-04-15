import { Pet } from "@prisma/client"
import { PetRepository } from "@/repository/pet-repository"

interface RegisterPetUseCaseRequest {
  name: string
  breed: string
  age: number
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name, breed, age, orgId
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({ name, age, breed, orgId })
    return { pet }
  }
}