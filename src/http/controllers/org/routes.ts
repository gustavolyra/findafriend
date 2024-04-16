import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { register } from "./register";
import { refresh } from "./refresh";
import { authenticate } from "./authenticate";


export async function orgRoutes(app: FastifyInstance) {

  app.post('/org', register)
  app.patch('/token/refresh', refresh)
  app.post('/sessions', authenticate)
  // app.get('/test', (request: FastifyRequest, reply: FastifyReply) => {
  //   return reply.status(222).send()
  // })
}