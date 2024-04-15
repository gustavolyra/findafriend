import { PrismaOrgRepository } from "@/repository/prisma/prisma-org-repository";
import { SearchOrgByCityUseCase } from "@/use-cases/search-org-by-city";

export function makeSearchOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const searchOrgUseCase = new SearchOrgByCityUseCase(orgRepository)

  return searchOrgUseCase
}