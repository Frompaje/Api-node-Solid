import { InvalidCredentialsError } from "@/error/invalid-credentials-error";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AutheticateUseCaseResponse {}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }): Promise<AutheticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }
  }
}
