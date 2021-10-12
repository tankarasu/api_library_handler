// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../src/server";
import { fakeDatabase } from "../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
let testedServer: FastifyInstance;

beforeAll(async() => {
  testedServer = buildServer();
});

afterAll(async() => {
  await testedServer.close();
});

describe("GET all books test suite", ()=>{
  test(`
    GIVEN 'http://localhost:8080/books' route method = GET
    WHEN request is sent
    THEN should return all the books in the library
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url: "/books"
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase))
  })
})

describe("GET all books by ID test suite", ()=>{
  test(`
    GIVEN 'http://localhost:8080/books/4' route method = GET
    WHEN request is sent with a non-existing book ID
    THEN should return an error message
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url: "/books/4"
    })

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe('Route GET:/books/4 not found')
    expect(error).toBe("Not Found")
    expect(statusCode).toBe(404)
  })


  test(`
    GIVEN 'http://localhost:8080/book/2' route method = GET
    WHEN request is sent
    THEN should return the books with id = 2
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`/book/2`
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase[1]))
  })
})

describe("GET suite",()=>{

  test(`
    GIVEN 'http://localhost:8080/bookcategory/?category=roman' route method = GET
    WHEN request is sent
    THEN should return all books with category = roman
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`/bookcategory?category=roman`
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase.filter(book=>book.category==="roman")))
  })

  // TODO use case with e é è
  test(`
    GIVEN 'http://localhost:8080/bookcategory/?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`/bookauthor?author=Molière`
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase.filter(book=>book.author==="Molière")))
  })

  test(`
    GIVEN 'http://localhost:8080/bookname' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`/bookname?name=Don Quichotte`
    })

    expect(response.payload)
      .toBe(JSON.stringify(fakeDatabase.filter(book=>book.name==="Don Quichotte")))
  })

  test(`
    GIVEN 'http://localhost:8080/bookyear' route method = GET
    WHEN request is sent on existing book year
    THEN should return all books with expected year
  `,
  async()=>{
    const year = 1862;
    const response = await testedServer.inject({
      method,
      url:`/bookyear?year=${year}`
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase.filter(book=>book.year=== year)))
  })
})
