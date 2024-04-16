import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { FindAllParams, PetRepository } from "@/repository/pet-repository";


export class PrismaPetRepository implements PetRepository {
  async setAsAdopted(id: string) {
    const pet = await prisma.pet.update({
      where: {
        id
      }, data: {
        isAvailable: false
      }
    })

    return pet
  }
  async create(data: Prisma.PetUncheckedCreateInput) {

    const pet = await prisma.pet.create({ data })
    return pet
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })
    return pet
  }
  async findAll(params: FindAllParams): Promise<{ id: string; name: string; age: number; created_at: Date; breed: string; isAvailable: boolean; orgId: string; }[]> {

    const pet = await prisma.pet.findMany({
      where: {
        age: {
          gte: Number(params.minAge),
          lte: Number(params.maxAge),
        },
        breed: params.breed,
        orgId: params.orgId,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive'
          }
        }
      }
    })
    return pet
  }
  async findManyByOrgId(orgId: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        orgId
      },
      take: 20,
      skip: (page - 1) * 20
    })
    return pet
  }
  async findManyByAge(maxAge: number, minAge: number, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        age: {
          gte: minAge,
          lte: maxAge
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })
    return pet
  }
  async findManyByBreed(breed: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        breed: {
          contains: breed
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })
    return pet
  }

}