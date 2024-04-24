import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { usersRouters } from "./http/controllers/users/routers";
import { gymsRouters } from "./http/controllers/gyms/routers";
import { ZodError } from "zod";
import { env } from "./env";
import { checkInsRouters } from "./http/controllers/check-ins/routers";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRouters);
app.register(gymsRouters);
app.register(checkInsRouters);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }
  return reply.status(500).send({ message: "Internal server error" });
});
