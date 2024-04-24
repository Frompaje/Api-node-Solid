import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { makeFetchUserCheckInsUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const fetchNearbyGymUsecase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymUsecase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ gyms });
}
