// Third-party requirements
import { FastifyInstance } from "fastify";

// Internal requirements
import * as controller from "../controllers/putController";

export async function put(server:FastifyInstance) {
  server.put("book/:id", controller.updateBook);
}
