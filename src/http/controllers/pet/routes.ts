import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { search } from "./search";
import { adopted } from "./adopted";


export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pet', register)
  app.post('/pet/:id/adopted', adopted)
  app.get('/pet', search)
}