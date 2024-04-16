import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { register } from "./register";
import { search } from "./search";
import { adopted } from "./adopted";


export async function petRoutes(app: FastifyInstance) {
  //app.addHook('onRequest', verifyJWT)

  app.get('/test', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(222).send()
  })
  app.post('/org/pet', register)
  app.post('/pet/:id/adopted', adopted)
  app.get('/pet', search)
}