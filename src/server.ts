// Third-party requirements
import Fastify, { FastifyInstance } from "fastify";

// Internal requirements
import { apiRoutes } from "./api";
// Function
export function buildServer(options = {}): FastifyInstance {
  const server = Fastify(options);
  server.register(apiRoutes, { prefix: "/api" });

  return server;
}
