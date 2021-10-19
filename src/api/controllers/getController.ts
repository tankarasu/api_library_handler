// Third-party requirements
import { FastifyRequest } from "fastify";

// Internal requirements
import { fakeDatabase } from "../../utils/fakeDatabase";
import { throwError, formatQueryString } from "../../utils";
import { Book, BookRequest,BookStatistic, Statistic } from "../../types/types";
import * as DB from "../DB"

export async function getBooksWithFilters(request: FastifyRequest<BookRequest>): Promise<Book[]|void> {
  formatQueryString(request);
  const books: Book[] = DB.getFilteredDB(request.query)

  return books.length === 0 ? throwError("No book found") : books;
}

export async function getStatistics(): Promise<Statistic> {
  const statistics = <Statistic> {
    totalBooks: 0,
    totalBooksByCategory: {}
  };

  const { totalBooksByCategory: booksQuantity } = statistics;

  fakeDatabase.reduce((acc, cur) => {
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

  return statistics;
}

// export async function searchInsideAllBook(request:FastifyRequest<BookRequest>): Promise<Book[]> {
//   let { requestedWord } = request.query;
//   if (!requestedWord) {
//     return fakeDatabase;
//   }

//   return fakeDatabase.filter(book => {
//     let { name, author } = book;
//     name = name.toLowerCase();
//     author = author.toLowerCase();
//     requestedWord = requestedWord!.toLowerCase();

//     return name.includes(requestedWord) ||
//       author.includes(requestedWord);
//   });
// }

export async function searchInsideAllBookCategory(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}

export async function searchInsideAllBookAuthor(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}

export async function bookStartWithLetter(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}

export async function howManyTimeTaken(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);

  return fakeDatabase;
}

export async function percentageTypeBook(): Promise<Statistic> {
  const statistics = await getStatistics();

  const { totalBooksByCategory, totalBooks } = statistics;
  const result = <Statistic> {
    totalBooks,
    totalBooksByCategory: {}
  };

  for (const type in totalBooksByCategory) {
    const value = totalBooksByCategory[<keyof BookStatistic>type];
    result.totalBooksByCategory[<keyof BookStatistic>type] = Math.round((value / totalBooks) * 100);
  }

  return result;
}
