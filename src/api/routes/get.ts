// Third-party requirements
import { FastifyInstance } from "fastify";

// Internal requirements
import * as controller from "../controllers/getController"

export async function get(server: FastifyInstance):Promise<void> {
  server.get("/", controller.getAllBooks)
  server.get("/:id", controller.getBookById)
  server.get("/category", controller.getBookByCategory)
  server.get("/author", controller.getBookByAuthor)
  server.get("/name", controller.getBookByName)
  server.get("/year", controller.getBookByYear)
}

