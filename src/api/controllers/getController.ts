// Third-party requirements
import { FastifyRequest } from "fastify";

// Internal requirements
import { fakeDatabase } from "../../utils/fakeDatabase";
import { Book, BookRequest, kBookType } from "../../types/types";

function throwError(message:string) {
  throw new Error(message);
}

function replyResult(result: Book | Book[]) {
  return result;
}

// TODO find a better name
// TODO add a type for different result types
type expectedResult = Book | Book[] | void;
type BookStatistic = { [key in kBookType as key]: number };

interface Statistic {
  totalBooks: number;
  totalBooksByCategory: BookStatistic;
}

export async function getAllBooks(): Promise<Book[]> {
  return fakeDatabase;
}

export async function getBookById(request: FastifyRequest<BookRequest>): Promise<expectedResult> {
  const { id } = request.params;
  const book: Book | undefined = fakeDatabase.find(book => book.id === Number(id));

  return !book ? throwError("No book found") : replyResult(book);
}

export async function getBookByCategory(request: FastifyRequest<BookRequest>): Promise<expectedResult> {
  const { category } = request.query;
  const books: Book[] = fakeDatabase.filter(book => book.category === category);

  return books.length === 0 ? throwError("No book found") : replyResult(books);
}

export async function getBookByAuthor(request: FastifyRequest<BookRequest>): Promise<expectedResult> {
  const { author } = request.query;
  const books: Book[] = fakeDatabase.filter(book => book.author === author);

  return books.length === 0 ? throwError("No book found") : replyResult(books);
}

export async function getBookByName(request: FastifyRequest<BookRequest>): Promise<expectedResult> {
  const { name } = request.query;
  const books: Book[] = fakeDatabase.filter(book => book.name === name);

  return books.length === 0 ? throwError("No book found") : replyResult(books);
}

export async function getBookByYear(request: FastifyRequest<BookRequest>): Promise<expectedResult> {
  const { year } = request.query;
  const books: Book[] = fakeDatabase.filter(book => book.year === Number(year));

  return books.length === 0 ? throwError("No book found") : replyResult(books);
}

export async function getStatistics(): Promise<Statistic> {
  const statistics = {
    totalBooks: 0,
    totalBooksByCategory: {}
  } as Statistic;

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

export async function searchInsideAllBook(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}

export async function searchInsideAllBookCategory(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}

export async function searchInsideAllBookAuthor(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}

export async function bookStartWithLetter(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}

export async function howManyTimeTaken(request: FastifyRequest<BookRequest>): Promise<Book[]> {
  // TODO to delete
  console.log(request.body);
  // do stuff
  return fakeDatabase;
}

export async function percentageTypeBook(): Promise<Statistic> {
  const statistics = await getStatistics();

  const { totalBooksByCategory, totalBooks } = statistics;
  const result: Statistic = {
    totalBooks,
    totalBooksByCategory: {}
  } as Statistic;

  for (const type in totalBooksByCategory) {
    const value = totalBooksByCategory[type as keyof BookStatistic];
    result.totalBooksByCategory[type as keyof BookStatistic] = Math.round((value / totalBooks) * 100);
  }
  console.log("result: ", result);

  return result;
}
