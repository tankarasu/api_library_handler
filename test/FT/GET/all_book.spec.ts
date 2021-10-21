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

describe("GET all books test suite", () => {
  test(`
    GIVEN 'http://localhost:8080/api/book' - GET
    WHEN request is sent
    THEN should return all the books in the library
  `,
    async () => {
      const response = await testedServer.inject({
        method,
        url: kBaseURL
      });

      expect(response.payload).toBe(JSON.stringify(DB));
    });
});
