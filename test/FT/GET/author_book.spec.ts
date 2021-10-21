// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../../src/server";
import { fakeDatabase as DB } from "../../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
const kBaseURL = "api/book";
const testedServer: FastifyInstance = buildServer();

afterAll(async () => {
  await testedServer.close();
});

describe("GET all books by author", () => {
  const kExistingAuthor = "Molière";
  const kNonExistingAuthor = "non-existing-author";

  // TODO use case with e é è
  test(`
    GIVEN 'http://localhost:8080/api/book/?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
    async () => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?author=${kExistingAuthor}`
      });

      const expectedResult = JSON.stringify(DB.filter(book => book.author === "Molière"));

      expect(response.payload).toBe(expectedResult);
    });

  test(`
    GIVEN 'http://localhost:8080/api/book?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
    async () => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}?author=${kNonExistingAuthor}`
      });

      const responseObject = JSON.parse(response.payload);
      const { message, error, statusCode } = responseObject;

      expect(message).toBe("No book found");
      expect(error).toBe("Internal Server Error");
      expect(statusCode).toBe(500);
    });
});
