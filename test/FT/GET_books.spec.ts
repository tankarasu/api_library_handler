// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../src/server";
import { fakeDatabase } from "../../src/utils/fakeDatabase";

// CONSTANTS & variable declarations
const method = "GET";
const kBaseURL = "api/book"
let testedServer: FastifyInstance;

beforeAll(async() => {
  testedServer = buildServer();
});

afterAll(async() => {
  await testedServer.close();
});

describe("GET all books test suite", ()=>{
  test(`
    GIVEN 'http://localhost:8080/api/book' - GET
    WHEN request is sent
    THEN should return all the books in the library
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url: kBaseURL
    })

    expect(response.payload).toBe(JSON.stringify(fakeDatabase))
  })
})

describe("GET all books by ID test suite", ()=>{
  const kNonExistingBookId = 4
  const kExistingBookId = 2
  test(`
    GIVEN 'http://localhost:8080/api/book/4' route method = GET
    WHEN request is sent with a non-existing book ID
    THEN should return an error message
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/${kNonExistingBookId}`
    })

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe('No book found')
    expect(error).toBe("Internal Server Error")
    expect(statusCode).toBe(500)
  })


  test(`
    GIVEN 'http://localhost:8080/api/book/2' route method = GET
    WHEN request is sent
    THEN should return the books with id = 2
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`${kBaseURL}/${kExistingBookId}`
    })

    const expectedResult = JSON.stringify(fakeDatabase.filter(book => book.id === kExistingBookId)[0])
    
    expect(response.payload).toBe(expectedResult)
  })
})

describe("GET suite",()=>{
  const kValidCategory = "roman"
  const kExistingAuthor = "Molière"
  const KValidBookname= "Don Quichotte"
  const kValidBookYear = 1862
  test(`
    GIVEN 'http://localhost:8080/api/book/category/?category=roman' route method = GET
    WHEN request is sent
    THEN should return all books with category = roman
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`${kBaseURL}/category?category=${kValidCategory}`
    })

    const expectedResult = JSON.stringify(fakeDatabase.filter(book=>book.category==="roman"))

    expect(response.payload).toBe(expectedResult)
  })

  // TODO use case with e é è
  test(`
    GIVEN 'http://localhost:8080/api/book/author/?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`${kBaseURL}/author?author=${kExistingAuthor}`
    })

    const expectedResult = JSON.stringify(fakeDatabase.filter(book=>book.author==="Molière"))

    expect(response.payload).toBe(expectedResult)
  })

  test(`
    GIVEN 'http://localhost:8080/api/book/name' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`${kBaseURL}/name?name=${KValidBookname}`
    })

    const expectedResult = JSON.stringify(fakeDatabase.filter(book=>book.name==="Don Quichotte"))

    expect(response.payload).toBe(expectedResult)
  })

  test(`
    GIVEN 'http://localhost:8080/api/book/year' route method = GET
    WHEN request is sent on existing book year
    THEN should return all books with expected year
  `,
  async()=>{
    const response = await testedServer.inject({
      method,
      url:`${kBaseURL}/year?year=${kValidBookYear}`
    })

    const expectedResult =JSON.stringify(fakeDatabase.filter(book=>book.year=== kValidBookYear))

    expect(response.payload).toBe(expectedResult)
  })
})
