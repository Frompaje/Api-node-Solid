import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function usersRouters(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated **/
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
