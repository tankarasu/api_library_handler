// Third-party requirements
import { FastifyInstance } from "fastify";

// Internal requirements
import * as controller from "../controllers/getController";

// TODO find a better name for function
export async function get(server: FastifyInstance):Promise<void> {
  server.get("/", controller.getBooksWithFilters);
  server.get("/statistics", controller.getStatistics);
  server.get("/percentage", controller.percentageTypeBook);
  // server.get("/search", controller.searchInsideAllBook);
}
