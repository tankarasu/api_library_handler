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

describe("GET all book by category", () => {
  const kValidCategory = "roman";
  const kInvalidCategory = "non-existing-category";

  test(`
    GIVEN 'http://localhost:8080/api/book/?category=${kInvalidCategory}' route method = GET
    WHEN request is sent with a non-existing category
    THEN should return an error message
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?category=${kInvalidCategory}`
      });

      const responseObject = JSON.parse(response.payload);
      const {message, error, statusCode} = responseObject;

      expect(message).toBe("No book found");
      expect(error).toBe("Internal Server Error");
      expect(statusCode).toBe(500);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book?category=${kValidCategory}' route method = GET
    WHEN request is sent with a valid category => 'roman'
    THEN should return all books with category = roman
  `,
    async() => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?category=${kValidCategory}`
      });

      const expectedResult = JSON.stringify(DB.filter(book => book.category === kValidCategory));

      expect(response.payload).toBe(expectedResult);
    });

});
