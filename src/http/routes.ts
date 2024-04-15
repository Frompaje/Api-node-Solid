import { FastifyInstance } from "fastify";
import { Model } from "./controllers";

const model = new Model();

export async function appRouters(app: FastifyInstance) {
  app.post("/users", model.register);
}
