import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { RegisterOrgUseCase } from "@/use-cases/register-org";


export function makerRegisterUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)

  return registerOrgUseCase
} 