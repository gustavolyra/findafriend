import { makerRegisterPetUseCase } from "@/factory/make-register-pet-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerPetSchema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    orgId: z.string()
  })

  const { name, age, breed, orgId } = registerPetSchema.parse(request.body)
  try {
    const registerPetUseCase = makerRegisterPetUseCase()
    await registerPetUseCase.execute({
      name, breed, age, orgId
    })
  } catch (err) {
    throw err
  }
  return reply.status(201).send()
}