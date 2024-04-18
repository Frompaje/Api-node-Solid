import { InvalidCredentialsError } from "@/error/invalid-credentials-error";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();

    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
  return reply.status(200).send();
}
