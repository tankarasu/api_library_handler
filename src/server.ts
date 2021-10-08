// Third-party requirements
import Fastify, { FastifyInstance, RouteHandlerMethod } from "fastify";

// Internal requirements
import { fakeDatabase } from "./utils/fakeDatabase";
import { Book, BookRequest} from "./types/types"

// Function
export function buildServer(options = {}): FastifyInstance{
  const server = Fastify(options)
  // Routes
  server.get('/books', getAllBook)
  server.get('/books/:id', getBookById as RouteHandlerMethod)

  return server
}

async function getAllBook(): Promise<Book[]>{
  return fakeDatabase
}

async function getBookById(request: BookRequest): Promise<Book | ErrorConstructor>{
  const { id } = request.params
  const book: Book | undefined = fakeDatabase.find(book => book.id === Number(id))

  if(!book){
    throw new Error('Book not found')
  }
  return book
}


