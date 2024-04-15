import { makerFectchPetUseCase } from "@/factory/make-fetch-pet-use-case";
import { makerRegisterPetUseCase } from "@/factory/make-register-pet-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function search(request: FastifyRequest, reply: FastifyReply) {

  const registerPetSchema = z.object({
    maxAge: z.number().optional(),
    minAge: z.number().optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    city: z.string()
  })

  const { minAge, maxAge, breed, orgId, city } = registerPetSchema.parse(request.body)

  try {
    const fetchPetUserCase = makerFectchPetUseCase()
    await fetchPetUserCase.execute({
      breed, minAge, maxAge, orgId, city
    })
  } catch (err) {
    throw err
  }
  return reply.status(201).send()
}