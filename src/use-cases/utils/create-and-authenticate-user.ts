import request from "supertest";
import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jonhdoes@exemple.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "jonhdoes@exemple.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jonhdoes@exemple.com",
    password: "123456",
  });
  const { token } = authResponse.body;

  return { token };
}
