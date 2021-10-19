// Internals requirements
import { fakeDatabase } from "../../src/utils/fakeDatabase";
import { getFilteredDB } from "../../src/api/DB";

describe('getFilteredDB tests suite',()=>{
  test(`
    GIVEN 0 paramaters to the function's options
    WHEN function is called
    THEN should return entire DB
  `,
  async() => {
    expect(getFilteredDB()).toMatchObject(fakeDatabase)
  })

  test(`
    GIVEN 1 paramaters to the function's options
    WHEN function is called with id = 1
    THEN should return all BOOKs with id = 1
  `,
  async() => {
    const DB = fakeDatabase;
    const kExistingBookId = 1
    const expectedResult = DB.filter(book => book.id === kExistingBookId);
    const options = {id: 1}

    expect(getFilteredDB(options)).toMatchObject(expectedResult)
  })

  test(`
  GIVEN 1 paramaters to the function's options
  WHEN function is called with author = Molière
  THEN should return all BOOKs with author = Molière
  `,
  async() => {
    const DB = fakeDatabase;
    const kExistingBookAuthor = "Molière"
    const expectedResult = DB.filter(book => book.author === kExistingBookAuthor);
    const options = {author: "Molière"}

    expect(getFilteredDB(options)).toMatchObject(expectedResult)
  })

  test(`
  GIVEN 2 paramaters to the function's options
  WHEN function is called with author = Molière
    THEN should return all BOOKs with author = Molière
    `,
  async() => {
    const kExistingBookId = 11
    const DB = fakeDatabase;
    const kExistingBookAuthor = "Molière"
    const expectedResult = DB.filter(book => {
      return book.author === kExistingBookAuthor && book.id === kExistingBookId
    });
    const options = {author: kExistingBookAuthor, id: kExistingBookId}

    expect(getFilteredDB(options)).toMatchObject(expectedResult)
  })
})
