import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRouters(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  /** Authenticated **/
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
