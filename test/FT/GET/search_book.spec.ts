// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../../src/server";
import { fakeDatabase as DB } from "../../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
const url = "api/book/search/";
const testedServer: FastifyInstance = buildServer();

afterAll(async () => {
  await testedServer.close();
});

describe("GET all books test suite", () => {
  test(`
    GIVEN 'http://localhost:8080/api/book/search' - GET
    WHEN request is sent with no terms search
    THEN should return all the books in the library
  `,
    async () => {
      const response = await testedServer.inject({
        method,
        url
      });

      expect(response.payload).toBe(JSON.stringify(DB));
    });

  test(`
    GIVEN 'http://localhost:8080/api/book/search/Les' - GET
    WHEN request is sent with term 'Les' in param
    THEN should return all the books in the library who contains the term somewhere CASE INSENSITIVE
  `,
    async () => {
      const expectedResult = [
        { name: "les misérables", id: 2, category: "roman", author: "Victor Hugo", year: 1862 }
];

      const response = await testedServer.inject({
        method,
        url: url + "Les"
      });

      const returnedResult = JSON.parse(response.payload)

      expect(returnedResult).toMatchObject(expectedResult);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book/search/Les?category=roman' - GET
    WHEN request is sent with term 'Les' in param and category = 'roman'
    THEN should return all the books in the library who contains the term somewhere
  `,
    async () => {
      const expectedResult = [
        { name: "les misérables", id: 2, category: "roman", author: "Victor Hugo", year: 1862 }
];

      const response = await testedServer.inject({
        method,
        url: url + "les?category=roman"
      });

      const returnedResult = JSON.parse(response.payload)

      expect(returnedResult).toMatchObject(expectedResult);
    });
});
