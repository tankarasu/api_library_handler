// Third-party requirements
import { FastifyRequest } from "fastify";

// Internals requirement
import { BookRequest, Book, Statistic, BookStatistic } from "../types/types";

export function throwError(message: string) {
  throw new Error(message);
}

export function formatQueryString(request: FastifyRequest<BookRequest, import("http").Server, import("http").IncomingMessage>) {
  if (request.query.id) {
    request.query.id = parseInt(request.query.id as string);
  }

  if (request.query.year) {
    request.query.year = parseInt(request.query.year as string);
  }
}

export function countBookByCategory(database: Array<Book>, statistics: Statistic) {
  const {
    totalBooksByCategory: booksQuantity
  } = statistics;

  database.reduce((acc, cur) => {
    const { category } = cur;
    statistics.totalBooks++;

    if (booksQuantity[category]) {
      booksQuantity[category]++;
    }
    else {
      booksQuantity[category] = 1;
    }

    return acc;
  }, {});

  const {totalBooksByCategory, totalBooks, percentageByCategory} = statistics

  for(const type in totalBooksByCategory){
    percentageByCategory[<keyof BookStatistic>type] = Math.round(totalBooksByCategory[<keyof BookStatistic>type] / totalBooks * 100)
  }
}
