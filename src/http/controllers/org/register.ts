import { makerRegisterUseCase } from "@/factory/make-register-org-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerOrgSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    email: z.string().email()
  })

  const { name, address, city, phone, password, cep, email } = registerOrgSchema.parse(request.body)

  try {
    const registerOrgUseCase = makerRegisterUseCase()
    await registerOrgUseCase.execute({
      name, address, city, phone, password, cep, email
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}