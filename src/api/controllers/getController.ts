// Third-party requirements
import { FastifyRequest } from "fastify"

// Internal requirements
import { fakeDatabase } from "../../utils/fakeDatabase"
import {Book, BookRequest} from "../../types/types"

export async function getAllBooks(): Promise<Book[]>{
    return fakeDatabase
}

export async function getBookById(request: FastifyRequest<BookRequest>): Promise<Book | ErrorConstructor>{
  const { id } = request.params
  const book: Book | undefined = fakeDatabase.find(book => book.id === Number(id))

  if(!book){
    throw new Error("No book found")
  }

  return book
}

export async function getBookByCategory(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { category } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.category === category)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

export async function getBookByAuthor(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { author } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.author === author)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

export async function getBookByName(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { name } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.name === name)

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}

export async function getBookByYear(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  const { year } = request.query
  const books: Book[] = fakeDatabase.filter(book => book.year === Number(year))

  if(books.length === 0){
    throw new Error('No Book found')
  }
  return books
}
