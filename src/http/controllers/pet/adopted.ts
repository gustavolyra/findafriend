import { makeSetPetAsAdoptedUseCase } from "@/factory/make-set-pet-as-adopted-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function adopted(request: FastifyRequest, reply: FastifyReply) {

  const adoptedParamsSchema = z.object({
    id: z.string().uuid()
  })

  const { id } = adoptedParamsSchema.parse(request.params)

  const setPetAsAdopted = makeSetPetAsAdoptedUseCase()

  setPetAsAdopted.execute({ petId: id })

  return reply.status(201).send()
}