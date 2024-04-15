import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";

export class Model {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const password_hash = await hash(password, 6);

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password_hash,
        },
      });
      return reply.status(201).send("Usuario criado com sucesso!");
    } catch (Erro) {
      console.error(
        `${Erro}, Erro ao criar o usuario. Já existe usuario cadrastado com esse email`
      );
      return reply
        .status(409)
        .send(
          "Erro ao criar o usuario. Já existe usuario cadrastado com esse email"
        );
    }
  }
}
