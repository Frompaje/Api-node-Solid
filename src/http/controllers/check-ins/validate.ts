import { makeValidateCheckInsUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInUseCase = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInUseCase.parse(request.params);

  const validateCheckInUsecase = makeValidateCheckInsUseCase();

  await validateCheckInUsecase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
