import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { refresh } from "./refresh";
import { authenticate } from "./authenticate";


export async function orgRoutes(app: FastifyInstance) {

  app.post('/org', register)
  app.patch('/token/refresh', refresh)
  app.post('/sessions', authenticate)

}