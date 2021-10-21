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

describe("GET books by year suite", () => {
  const kExistingBookYear = 1862;
  const kNonExistingBookYear = 1664;

  test(`
    GIVEN 'http://localhost:8080/api/book?${kNonExistingBookYear}' route method = GET
    WHEN request is sent on non-existing book year
    THEN should return an Error
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?year=${kNonExistingBookYear}`
      });

      const responseObject = JSON.parse(response.payload);
      const {message, error, statusCode} = responseObject;

      expect(message).toBe("No book found");
      expect(error).toBe("Internal Server Error");
      expect(statusCode).toBe(500);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book?year=${kExistingBookYear}' route method = GET
    WHEN request is sent on existing book year
    THEN should return all books with expected year
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?year=${kExistingBookYear}`
      });

      const expectedResult = JSON.stringify(DB.filter(book => book.year === kExistingBookYear));

      expect(response.payload).toBe(expectedResult);
    });
});
