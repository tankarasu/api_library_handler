// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../src/server";
import { fakeDatabase } from "../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
const url = "/books";
let testedServer: FastifyInstance;

beforeAll(async() => {
  testedServer = buildServer();
});

afterAll(async() => {
  await testedServer.close();
});
// TODO error-first testing

describe("GET suite",()=>{
  test(`
    GIVEN 'http://localhost:8080/books' route method = GET
    WHEN request is sent
    THEN should return all the books in the library
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase))
  })

  test(`
    GIVEN 'http://localhost:8080/books/2' route method = GET
    WHEN request is sent
    THEN should return the books with id = 2
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`/books/2`
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase[1]))
  }
  )
})
