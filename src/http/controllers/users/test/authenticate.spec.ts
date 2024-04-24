import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to Authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jhonddsad@example.com",
      password: "1234567",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "jhonddsad@example.com",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
