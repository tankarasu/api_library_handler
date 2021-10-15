// Third-party requirements
import { FastifyRequest } from "fastify";

// Internal requirements
import { Book, BookRequest } from "../../types/types";
import { fakeDatabase } from "../../utils/fakeDatabase";

export async function updateBook(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}
