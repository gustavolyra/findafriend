import { PrismaPetRepository } from "@/repository/prisma/prisma-pet-repository";
import { RegisterPetUseCase } from "@/use-cases/register-pet";


export function makerRegisterPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const registerPetUseCase = new RegisterPetUseCase(petRepository)

  return registerPetUseCase
} 