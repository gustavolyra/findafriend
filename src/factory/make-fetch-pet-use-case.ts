import { PrismaPetRepository } from "@/repository/prisma/prisma-pet-repository";
import { FetchPetUseCase } from "@/use-cases/fetch-pet";

export function makerFectchPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const fetchPetUserCase = new FetchPetUseCase(petRepository)

  return fetchPetUserCase
} 