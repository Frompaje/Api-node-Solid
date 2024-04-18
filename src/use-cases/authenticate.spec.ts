import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { InvalidCredentialsError } from "@/error/invalid-credentials-error";

describe("Register Use Case", () => {
  it("should be able to authenticate with wrong", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "okdas@gmail.com",
      password_hash: await hash("481523321", 6),
    });

    const { user } = await sut.execute({
      email: "okdas@gmail.com",
      password: "481523321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "okdas@gmail.com",
      password_hash: await hash("123123", 6),
    });

    expect(() =>
      sut.execute({
        email: "okdas@gmail.com",
        password: "481523321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "okdas@gmail.com",
        password: "481523321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
