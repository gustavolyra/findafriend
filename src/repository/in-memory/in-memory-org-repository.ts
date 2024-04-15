import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepository } from "@/repository/org-repository";


export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []

  async create({ name, phone, address, city, cep, email, password_hash }: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name,
      created_at: new Date(),
      phone,
      address,
      city,
      cep,
      email,
      password_hash
    }
    this.items.push(org)
    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) =>
      item.id === id
    )
    if (!org) return null
    return org
  }

  async findByCity(city: string) {
    const org = this.items.filter((item) =>
      item.city === city
    )
    if (!org) return null
    return org
  }

  async findByName(name: string) {

    const org = this.items.find((item) =>
      item.name === name
    )
    if (!org) return null
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) =>
      item.email === email
    )
    if (!org) return null
    return org
  }

}