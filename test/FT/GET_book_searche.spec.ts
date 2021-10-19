/* eslint-disable no-undef */

// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../src/server";
// import { fakeDatabase as DB } from "../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
// const method = "GET";
// const kBaseURL = "api/book/search";
const testedServer: FastifyInstance = buildServer();

afterAll(async () => {
  await testedServer.close();
});

describe("GET get search suite", () => {
  // TODO delete
  test('true', ()=>{
    expect(true).toBeTruthy();
  })
  // test(`
  //   GIVEN 'http://localhost:8080/api/book/search' route method = GET
  //   WHEN request is sent with EMPTY search term WITHOUT filter
  //   THEN should return all books
  // `,
  // async () => {
  //   const response = await testedServer.inject({
  //     method,
  //     url: `${kBaseURL}`
  //   });

  //   expect(JSON.parse(response.payload)).toMatchObject(DB);
  // });

  // test(`
  //   GIVEN 'http://localhost:8080/api/book/search' route method = GET
  //   WHEN request is sent with VALID search term WITHOUT filter
  //   THEN should return all books with expected search term
  // `,
  // async () => {
  //   const response = await testedServer.inject({
  //     method,
  //     url: `${kBaseURL}?requestedWord=Les`
  //   });

  //   const expectedResult = DB.filter(book => {
  //     return book.name.includes("les") || book.author.includes("les");
  //   });

  //   expect(JSON.parse(response.payload)).toMatchObject(expectedResult);
  // });

  // test(`
  //   GIVEN 'http://localhost:8080/api/book/search' route method = GET
  //   WHEN request is sent with VALID search term WITHOUT filter
  //   THEN should return all books with expected search term CASE INSENSITIVE
  // `,
  // async () => {
  //   const response = await testedServer.inject({
  //     method,
  //     url: `${kBaseURL}?requestedWord=DON`
  //   });

  //   const expectedResult = DB.filter(book => {
  //     return book.name.includes("Don") ||
  //       book.author.includes("Don");
  //   });

  //   expect(JSON.parse(response.payload)).toMatchObject(expectedResult);
  // });

  // test(`
  //   GIVEN 'http://localhost:8080/api/book/search?requestedWord=les&author=victor' route method = GET
  //   WHEN request is sent with VALID search term WITH filter on author
  //   THEN should return all books with expected search term CASE INSENSITIVE
  // `,
  // async () => {
  //   const response = await testedServer.inject({
  //     method,
  //     url: `${kBaseURL}?requestedWord=les&author=victor`
  //   });

  //   const expectedResult = DB.filter(book => {
  //     return (book.name.includes("les") || book.author.includes("les")) &&
  //       book.author.includes("Victor");
  //   });

  //   expect(JSON.parse(response.payload)).toMatchObject(expectedResult);
  // });
});
