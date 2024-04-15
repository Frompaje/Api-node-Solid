import fastify from "fastify";
import { appRouters } from "./http/routers";

export const app = fastify();

app.register(appRouters);
