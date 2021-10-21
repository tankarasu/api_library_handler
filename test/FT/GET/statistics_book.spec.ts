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

describe("GET get statistics suite", () => {
  test(`
    GIVEN 'http://localhost:8080/api/book/statistics' route method = GET
    WHEN request is sent
    THEN should return statistics
  `,
    async () => {
      const response = await testedServer.inject({
        method,
        url: `${kBaseURL}/statistics`
      });

      const expectedResult = {
        totalBooks: DB.length,
        totalBooksByCategory: {
          roman: DB.filter(book => book.category === "roman").length,
          drama: DB.filter(book => book.category === "drama").length,
          cartoon: DB.filter(book => book.category === "cartoon").length,
          thriller: DB.filter(book => book.category === "thriller").length
        }
      };

      expect(JSON.parse(response.payload)).toMatchObject(expectedResult);
    });
  }
)
