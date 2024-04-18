import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register";
import { UserAlreadyExistsError } from "@/error/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it.skip("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "jon",
      email: "okdas@gmail.com",
      password: "481523321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it.skip("should create a hashed password", async () => {
    const { user } = await sut.execute({
      name: "jon",
      email: "okdas@gmail.com",
      password: "481523321",
    });
    const isPasswordCorrectlyHashed = await compare(
      "481523321",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it.skip("should no tbe able to register with same email twice", async () => {
    const email = "niscolai@gmail.com";

    await sut.execute({
      name: "jon",
      email: email,
      password: "481523321",
    });

    await expect(() => {
      return sut.execute({
        name: "jon",
        email: email,
        password: "481523321",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
