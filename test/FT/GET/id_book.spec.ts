/* eslint-disable no-undef */

// Third-Party requirement
import {FastifyInstance} from "fastify";

// Internal Requirements
import {buildServer} from "../../../src/server";
import {fakeDatabase as DB} from "../../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
const kBaseURL = "api/book";
const testedServer: FastifyInstance = buildServer();

afterAll(async() => {
  await testedServer.close();
});

describe("GET all books by ID test suite", () => {
  const kNonExistingBookId = 44;
  const kExistingBookId = 2;

  test(`
    GIVEN 'http://localhost:8080/api/book?id=${kNonExistingBookId}' route method = GET
    WHEN request is sent with a non-existing book ID
    THEN should return an error message
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?id=${kNonExistingBookId}`
      });

      const responseObject = JSON.parse(response.payload);
      const {message, error, statusCode} = responseObject;

      expect(message).toBe("No book found");
      expect(error).toBe("Internal Server Error");
      expect(statusCode).toBe(500);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book?id=${kExistingBookId}' route method = GET
    WHEN request is sent
    THEN should return the books with id = 2
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?id=${kExistingBookId}`
      });

      const expectedResult = JSON.stringify(DB.filter(book => book.id === kExistingBookId));

      expect(response.payload).toBe(expectedResult);
    });
});
