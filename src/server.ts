// Third-party requirements
import Fastify, { FastifyInstance, FastifyRequest, RouteHandlerMethod } from "fastify";

// Internal requirements
import { fakeDatabase } from "./utils/fakeDatabase";
import { Book, BookRequest} from "./types/types"

// Function
export function buildServer(options = {}): FastifyInstance{
  const server = Fastify(options)

  // Routes
  server.get('/books', getAllBook)
  server.get('/book/:id', getBookById as unknown as RouteHandlerMethod)
  server.get('/bookcategory', getBookByCategory as unknown as RouteHandlerMethod)
  server.get('/bookname', getBookByName as unknown as RouteHandlerMethod)
  server.get('/bookauthor', getBookByAuthor as unknown as RouteHandlerMethod)
  server.get('/bookyear', getBookByYear as unknown as RouteHandlerMethod)
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

async function getAllBook(): Promise<Book[]>{
  return fakeDatabase
}

async function getBookById(request: FastifyRequest<BookRequest>): Promise<Book | ErrorConstructor>{
  const { id } = request.params
  const book: Book | undefined = fakeDatabase.find(book => book.id === Number(id))

  if(!book){
    throw new Error("No book found")
  }

  return book
}

async function getBookByName(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { name } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.name === name)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

async function getBookByCategory(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { category } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.category === category)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

async function getBookByAuthor(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { author } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.author === author)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

async function getBookByYear(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { year } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.year === Number(year))

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
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
