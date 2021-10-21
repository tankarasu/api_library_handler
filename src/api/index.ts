// Third-party requirements
import {FastifyInstance} from "fastify";

// Internal requirements
import {get} from "./routes";

export async function apiRoutes(server: FastifyInstance):Promise<void>{
  server.register(get, {prefix: "/book"});
}
