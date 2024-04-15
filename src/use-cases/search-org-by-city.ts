
import { OrgRepository } from "@/repository/org-repository"
import { Org } from "@prisma/client"
import { NoOrgRegisteredInThisCity } from "./errors/no-org-registered-in-this-city"



interface SearchOrgUseCaseRequest {
  city: string
}
interface SearchOrgUseCaseResponse {
  org: Org[]
}

export class SearchOrgByCityUseCase {

  constructor(private orgRepository: OrgRepository) {}

  async execute({ city }: SearchOrgUseCaseRequest): Promise<SearchOrgUseCaseResponse> {

    const org = await this.orgRepository.findByCity(city)

    if (!org) throw new NoOrgRegisteredInThisCity()

    return { org }
  }


}