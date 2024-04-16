import { makerFectchPetUseCase } from "@/factory/make-fetch-pet-use-case";
import { makerRegisterPetUseCase } from "@/factory/make-register-pet-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    maxAge: z.string().optional(),
    minAge: z.string().optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    city: z.string()
  })

  const { minAge, maxAge, breed, orgId, city } = querySchema.parse(
    request.query,
  )
  try {
    const fetchPetUserCase = makerFectchPetUseCase()
    await fetchPetUserCase.execute({
      breed, minAge: Number(minAge), maxAge: Number(maxAge), orgId, city
    })
  } catch (err) {
    throw err
  }
  return reply.status(201).send()
}