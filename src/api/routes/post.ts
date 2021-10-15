// Third-party requirements
import { FastifyInstance } from "fastify";

// Internal requirements
import * as controller from "../controllers/postController";

export async function post(server:FastifyInstance) {
  server.post("/", controller.addOneBook);
  server.post("/some", controller.addSomeBooks);
}
