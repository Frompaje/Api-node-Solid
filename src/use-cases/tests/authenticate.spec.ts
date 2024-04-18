import { InvalidCredentialsError } from "@/error/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it.skip("should be able to authenticate with wrong", async () => {
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

  it.skip("should be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "okdas@gmail.com",
      password_hash: await hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "okdas@gmail.com",
        password: "481523321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it.skip("should be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "okdas@gmail.com",
        password: "481523321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
