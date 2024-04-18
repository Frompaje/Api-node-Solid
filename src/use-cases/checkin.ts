import { InvalidCredentialsError } from "@/error/invalid-credentials-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { CheckIn, User } from "@prisma/client";
import { compare } from "bcryptjs";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}
export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
