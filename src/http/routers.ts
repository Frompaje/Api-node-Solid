import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

export async function appRouters(app: FastifyInstance) {
  app.post("/users", register);
}
