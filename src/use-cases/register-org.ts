
import { Org } from "@prisma/client"
import { hash } from "bcryptjs"
import { OrgRepository } from "@/repository/org-repository"
import { OrgNameAlreadyExistsError } from "./errors/org-already-exists-error"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"


interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  city: string
  phone: string
  password: string
  cep: string
  email: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {

  constructor(private orgRepository: OrgRepository) {}

  async execute({ name, address, city, phone, password, cep, email }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    if (await this.OrgWithTheSameName(name))
      throw new OrgNameAlreadyExistsError()

    if (await this.OrgWithTheSameEmail(email))
      throw new UserAlreadyExistsError()

    const org = await this.orgRepository.create({
      name, address, city, phone, cep, email, password_hash
    })

    return { org }
  }

  async OrgWithTheSameName(name: string): Promise<Boolean> {
    const orgWithTheSameName = await this.orgRepository.findByName(name)
    return orgWithTheSameName ? true : false
  }
  async OrgWithTheSameEmail(email: string) {
    const orgWithTheSameEmail = await this.orgRepository.findByEmail(email)
    return orgWithTheSameEmail ? true : false
  }
}