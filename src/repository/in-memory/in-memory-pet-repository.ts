import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindAllParams, PetRepository } from "@/repository/pet-repository";
import { InMemoryOrgRepository } from "./in-memory-org-repository";


export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgRepository) {}
  async setAsAdopted(id: string): Promise<{ id: string; name: string; age: number; created_at: Date; breed: string; isAvailable: boolean; orgId: string; } | null> {
    const petIndex = this.items.findIndex((item) => item.id === id)
    if (petIndex >= 0) {
      this.items[petIndex] = {
        ...this.items[petIndex], isAvailable: false
      }

      return this.items[petIndex]
    }
    return null
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.orgId))
      .filter((item) => (params.maxAge ? item.age <= params.maxAge : true))
      .filter((item) => (params.minAge ? item.age >= params.minAge : true))
      .filter((item) => (params.breed ? item.breed === params.breed : true))

    return pets
  }

  async create({ name, age, breed, orgId }: Prisma.PetUncheckedCreateInput): Promise<Pet> {

    const pet = {
      id: randomUUID(),
      name,
      age,
      breed,
      created_at: new Date(),
      orgId,
      isAvailable: true
    }
    this.items.push(pet)
    return pet
  }



  async findById(id: string) {
    const pet = this.items.find((item) =>
      item.id === id
    )
    if (!pet) return null
    return pet
  }
  async findManyByAge(maxAge: number, minAge: number, page: number) {
    return this.items
      .filter((item) =>
        item.age <= maxAge && item.age >= minAge
      )
  }
  async findManyByBreed(breed: string, page: number) {
    return this.items
      .filter((item) =>
        item.breed === breed
      )
      .slice((page - 1) * 20, page * 20)
  }
  async findManyByOrgId(orgId: string, page: number) {
    return this.items
      .filter((item) =>
        item.orgId === orgId
      )
      .slice((page - 1) * 20, page * 20)
  }
}