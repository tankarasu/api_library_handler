// Third-party requirements
import Fastify, { FastifyInstance } from "fastify";


// Function
export function buildServer(options = {}): FastifyInstance{
  const server = Fastify(options)
  // Routes
  server.get('/', getFunction)

  return server
}

async function getFunction(){
  return "Hello world"
}
