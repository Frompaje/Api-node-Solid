import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { UserAlreadyExistsError } from "@/error/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "jon",
      email: "okdas@gmail.com",
      password: "481523321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should create a hashed password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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

  it("should no tbe able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "niscolai@gmail.com";

    await registerUseCase.execute({
      name: "jon",
      email: email,
      password: "481523321",
    });

    await expect(() => {
      return registerUseCase.execute({
        name: "jon",
        email: email,
        password: "481523321",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
