/* eslint-disable no-undef */

// Third-Party requirement
import { FastifyInstance } from "fastify";

// Internal Requirements
import { buildServer } from "../../src/server";
import { fakeDatabase as DB } from "../../src/utils/fakeDatabase";

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

describe("GET all books by ID test suite", () => {
  const kNonExistingBookId = 44;
  const kExistingBookId = 2;
  test(`
    GIVEN 'http://localhost:8080/api/book/4' route method = GET
    WHEN request is sent with a non-existing book ID
    THEN should return an error message
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/${kNonExistingBookId}`
    });

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe("No book found");
    expect(error).toBe("Internal Server Error");
    expect(statusCode).toBe(500);
  });

  test(`
    GIVEN 'http://localhost:8080/api/book/2' route method = GET
    WHEN request is sent
    THEN should return the books with id = 2
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/${kExistingBookId}`
    });

    const expectedResult = JSON.stringify(DB.filter(book => book.id === kExistingBookId)[0]);

    expect(response.payload).toBe(expectedResult);
  });
});

describe("GET all book by category", () => {
  const kValidCategory = "roman";
  const kInvalidCategory = "non-existing-category";

  test(`
    GIVEN 'http://localhost:8080/api/book/category/?category=roman' route method = GET
    WHEN request is sent with a non-existing category
    THEN should return an error message
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/category?category=${kInvalidCategory}`
    });

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe("No book found");
    expect(error).toBe("Internal Server Error");
    expect(statusCode).toBe(500);
  });

  test(`
    GIVEN 'http://localhost:8080/api/book/category/?category=roman' route method = GET
    WHEN request is sent with a valid category => 'roman'
    THEN should return all books with category = roman
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/category?category=${kValidCategory}`
    });

    const expectedResult = JSON.stringify(DB.filter(book => book.category === kValidCategory));

    expect(response.payload).toBe(expectedResult);
  });
});

describe("GET all books by author", () => {
  const kExistingAuthor = "Molière";
  const kNonExistingAuthor = "non-existing-author";

  // TODO use case with e é è
  test(`
    GIVEN 'http://localhost:8080/api/book/author/?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/author?author=${kExistingAuthor}`
    });

    const expectedResult = JSON.stringify(DB.filter(book => book.author === "Molière"));

    expect(response.payload).toBe(expectedResult);
  });

  test(`
    GIVEN 'http://localhost:8080/api/book/author/?author=Molière' route method = GET
    WHEN request is sent
    THEN should return all books with author = Molière
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/author?author=${kNonExistingAuthor}`
    });

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe("No book found");
    expect(error).toBe("Internal Server Error");
    expect(statusCode).toBe(500);
  });
});

describe("GET book by name suite", () => {
  test(`
    GIVEN 'http://localhost:8080/api/book/name' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
  async () => {
    const kNonExistingBookName = "non-existing-book-name";
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/name?name=${kNonExistingBookName}`
    });

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe("No book found");
    expect(error).toBe("Internal Server Error");
    expect(statusCode).toBe(500);
  });

  test(`
    GIVEN 'http://localhost:8080/api/book/name' route method = GET
    WHEN request is sent on existing book name
    THEN should return all books with expected name
  `,
  async () => {
    const KValidBookname = "Don Quichotte";

    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/name?name=${KValidBookname}`
    });

    const expectedResult = JSON.stringify(DB.filter(book => book.name === "Don Quichotte"));

    expect(response.payload).toBe(expectedResult);
  });
});

describe("GET books by year suite", () => {
  const kValidBookYear = 1862;
  const kNonExistingBookYear = 1664;

  test(`
    GIVEN 'http://localhost:8080/api/book/year' route method = GET
    WHEN request is sent on existing book year
    THEN should return all books with expected year
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/year?year=${kNonExistingBookYear}`
    });

    const responseObject = JSON.parse(response.payload);
    const { message, error, statusCode } = responseObject;

    expect(message).toBe("No book found");
    expect(error).toBe("Internal Server Error");
    expect(statusCode).toBe(500);
  });

  test(`
    GIVEN 'http://localhost:8080/api/book/year' route method = GET
    WHEN request is sent on existing book year
    THEN should return all books with expected year
  `,
  async () => {
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/year?year=${kValidBookYear}`
    });

    const expectedResult = JSON.stringify(DB.filter(book => book.year === kValidBookYear));

    expect(response.payload).toBe(expectedResult);
  });
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

  test(`
    GIVEN 'http://localhost:8080/api/book/percentage' route method = GET
    WHEN request is sent
    THEN should return statistics with percentage of books by category
  `,
  async () => {
    // CONSTANTS
    const response = await testedServer.inject({
      method,
      url: `${kBaseURL}/percentage`
    });

    const romanPercent = Math.round((DB.filter(book => book.category === "roman").length) / DB.length * 100);
    const dramaPercent = Math.round((DB.filter(book => book.category === "drama").length) / DB.length * 100);
    const cartoonPercent = Math.round((DB.filter(book => book.category === "cartoon").length) / DB.length * 100);
    const thrillerPercent = Math.round((DB.filter(book => book.category === "thriller").length) / DB.length * 100);

    const expectedResult = {
      totalBooks: DB.length,
      totalBooksByCategory: {
        roman: romanPercent,
        drama: dramaPercent,
        cartoon: cartoonPercent,
        thriller: thrillerPercent
      }
    };

    expect(JSON.parse(response.payload)).toMatchObject(expectedResult);
  });
});
