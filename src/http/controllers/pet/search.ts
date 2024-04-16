import { makerFectchPetUseCase } from "@/factory/make-fetch-pet-use-case";
import { makerRegisterPetUseCase } from "@/factory/make-register-pet-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function search(request: FastifyRequest, reply: FastifyReply) {
  console.log('here')
  const querySchema = z.object({
    maxAge: z.string().optional(),
    minAge: z.string().optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    city: z.string()
  })

  console.log('here')
  const { minAge, maxAge, breed, orgId, city } = querySchema.parse(
    request.query,
  )
  let minimumAge = 0
  let maximumAge = 20
  if (minAge) minimumAge = Number(minimumAge)
  if (maxAge) maximumAge = Number(maximumAge)

  try {
    const fetchPetUserCase = makerFectchPetUseCase()
    await fetchPetUserCase.execute({
      breed, minAge: minimumAge, maxAge: maximumAge, orgId, city
    })
  } catch (err) {
    throw err
  }
  return reply.status(201).send()
}