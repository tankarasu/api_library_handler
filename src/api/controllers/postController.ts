// Third-party requirements
import {FastifyRequest} from "fastify";

// Internal Requirements
import {fakeDatabase} from "../../utils/fakeDatabase";
import {Book, BookRequest} from "../../types/types";

export async function addOneBook(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}

export async function addSomeBooks(request: FastifyRequest<BookRequest>): Promise<Book[]>{
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}
