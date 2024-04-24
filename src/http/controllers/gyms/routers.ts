import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "domain";

export async function gymsRouters(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms/create", create);
}
