import { app } from "@/app";
import { createAndAuthenticateUser } from "@/use-cases/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascriptssd2 Gym",
        description: null,
        phone: null,
        latitude: 27.0618426,
        longitude: 49.0672237,
      });

    expect(response.statusCode).toEqual(201);
  });
});
