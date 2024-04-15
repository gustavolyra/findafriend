import { PrismaPetRepository } from "@/repository/prisma/prisma-pet-repository";
import { SetPetAsAdoptedUseCase } from "@/use-cases/set-pet-as-adopted";

export function makeSetPetAsAdoptedUseCase() {
  const petRepository = new PrismaPetRepository()
  const setPetAsAdoptedUseCase = new SetPetAsAdoptedUseCase(petRepository)

  return setPetAsAdoptedUseCase
}