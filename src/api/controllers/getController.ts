// Third-party requirements
import { FastifyRequest } from "fastify";

// Internal requirements
import { throwError, formatQueryString, countBookByCategory } from "../../utils";
import { Book, BookRequest, Statistic } from "../../types/types";
import * as DB from "../DB"

export async function getBooksWithFilters(request: FastifyRequest<BookRequest>): Promise<Book[]|void> {
  formatQueryString(request);

  return DB.getFilteredDB(request.query).length === 0 ?
    throwError("No book found") :
    DB.getFilteredDB(request.query);
}

export async function getStatistics(request: FastifyRequest<BookRequest>): Promise<Statistic | void> {
  const statistics = <Statistic> {
    totalBooks: 0,
    totalBooksByCategory: {},
    percentageByCategory: {}
  };
  const database  = await getBooksWithFilters(request)

  if(database) countBookByCategory(database, statistics)
  else return

  return statistics;
}

export async function searchInsideBook(request:FastifyRequest<BookRequest>): Promise<Book[]|void> {
  let { term } = request.params;
  let result: Array<Book> = [];
  const DB = await getBooksWithFilters(request)

  if(!term || term === "") return DB

  for(const book of DB!){
    for(const label in book){
      const labelValue = String(book[<keyof Book>label])
      if(labelValue.toLowerCase().includes(term.toLowerCase()) && !result.includes(book)) result.push(book)
    }
  }

  return result
}
