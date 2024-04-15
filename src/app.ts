import fastify from "fastify";
import { appRouters } from "./http/routes";

export const app = fastify();

app.register(appRouters);
