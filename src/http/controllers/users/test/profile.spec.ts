import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import exp from "constants";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jhonddsad@example.com",
      password: "1234567",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "jhonddsad@example.com",
      password: "1234567",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "jhonddsad@example.com",
      })
    );
  });
});
