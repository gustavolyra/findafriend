import { Prisma, Pet } from '@prisma/client'

export interface FindAllParams {
  city: string
  minAge?: number
  maxAge?: number
  breed?: string
  orgId?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrgId(orgId: string, page: number): Promise<Pet[]>
  findManyByAge(maxAge: number, minAge: number, page: number): Promise<Pet[]>
  findManyByBreed(breed: string, page: number): Promise<Pet[]>
  findAll(params: FindAllParams): Promise<Pet[]>
  setAsAdopted(id: string): Promise<Pet | null>
}