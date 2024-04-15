import prismaTestEnvironment from "prisma/vitest-environment-prisma/prisma-test-environment";
import { OrgRepository } from "@/repository/org-repository";
import { prisma } from '@/lib/prisma'
import { Prisma } from "@prisma/client";


export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data, })
    return org
  }
  async findByName(name: string) {
    const org = await prisma.org.findUnique({
      where: {
        name
      }
    })
    return org
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    })
    return org
  }
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id
      }
    })
    return org
  }
  async findByCity(city: string) {
    const org = await prisma.org.findMany({
      where: {
        city
      }
    })
    return org
  }

}