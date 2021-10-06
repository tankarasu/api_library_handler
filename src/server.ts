// Third-party requirements
import Fastify, { FastifyInstance } from "fastify";

// CONSTANTS
export const fakeDatabase = [
  { name: "Roméo & Juliet" },
  { name: "Les misérables" },
  { name: "Don Quichotte"}
]

// Function
export function buildServer(options = {}): FastifyInstance{
  const server = Fastify(options)
  // Routes
  server.get('/allbook', getAllBook)

  return server
}

async function getAllBook(): Promise<Book[]>{
  return fakeDatabase
}

// Type definition
interface Book{
  name: string
}
