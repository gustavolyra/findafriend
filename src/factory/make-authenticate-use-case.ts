import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";


export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateUseCase = new AuthenticateUseCase(orgRepository)

  return authenticateUseCase
}