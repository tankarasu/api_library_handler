// Third-party requirements
import { FastifyInstance } from "fastify";

// Internal requirements
import * as controller from "../controllers/deleteController";

export async function deletes(server:FastifyInstance) {
  server.delete("/:id", controller.deleteBook);
}
