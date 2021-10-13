// Third-party requirements
import Fastify, { FastifyInstance, FastifyRequest, RouteHandlerMethod } from "fastify";

// Internal requirements
import { fakeDatabase } from "./utils/fakeDatabase";
import { Book, BookRequest} from "./types/types"
import { apiRoutes } from "./api";
// Function
export function buildServer(options = {}): FastifyInstance{
  const server = Fastify(options)
  server.register(apiRoutes, { prefix: "/api" })

  // Routes
  server.get('/bookstartwith', bookStartWithLetter as unknown as RouteHandlerMethod)
  server.get('/statistics', getStatistics as unknown as RouteHandlerMethod)
  server.get('/howmanytime', howManyTimeTaken as unknown as RouteHandlerMethod)
  server.get('/percentage', percentageTypeBook as unknown as RouteHandlerMethod)
  server.get('/insidebooks', searchInsideAllBook as unknown as RouteHandlerMethod)
  server.get('/insidebookscategory', searchInsideAllBookCategory as unknown as RouteHandlerMethod)
  server.get('/insidebooksauthor', searchInsideAllBookAuthor as unknown as RouteHandlerMethod)

  server.post('/addbook', addOneBook as unknown as RouteHandlerMethod)
  server.post('/addsomebooks', addSomeBooks as unknown as RouteHandlerMethod)

  server.put('/updatebook', updateBook as unknown as RouteHandlerMethod)

  server.delete('/deletebook', deleteBook as unknown as RouteHandlerMethod)

  return server
}

async function addOneBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function addSomeBooks(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function updateBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function deleteBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function searchInsideAllBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function searchInsideAllBookCategory(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function searchInsideAllBookAuthor(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function bookStartWithLetter(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function getStatistics(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function howManyTimeTaken(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}

async function percentageTypeBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body)
  // do stuff
  return fakeDatabase
}
