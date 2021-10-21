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

describe("GET book by name suite", () => {
  const kNonExistingBookName = "non-existing-book-name";
  const kExistingBookName = "Don Quichotte";

  test(`
    GIVEN 'http://localhost:8080/api/book?name=${kNonExistingBookName}' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?name=${kNonExistingBookName}`
      });

      const responseObject = JSON.parse(response.payload);
      const {message, error, statusCode} = responseObject;

      expect(message).toBe("No book found");
      expect(error).toBe("Internal Server Error");
      expect(statusCode).toBe(500);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book?name${kExistingBookName}' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
    async() => {

      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?name=${kExistingBookName}`
      });

      const expectedResult = JSON.stringify(DB.filter(book => book.name === kExistingBookName));

      expect(response.payload).toBe(expectedResult);
    });
});
