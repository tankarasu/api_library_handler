// Internal requirements
import { buildServer } from "./server";

// Constants
const port = 8080;
const server = buildServer({ logger: true });

// Running server
try {
  server.log.info("Initializing app...");
  server.listen(port, () => server.log.info(`Server listening on ${port}`));
}
catch (error) {
  server.log.error("Error caught at entrypoint level", error);
  process.exit(1);
}
