// Internals requirements
import { fakeDatabase } from "../../utils/fakeDatabase";
import {Book, Filters} from "../../types/types"

export function getFilteredDB(opts?: Filters): Array<Book>{
let result: Array<Book> = fakeDatabase

  for(const filterLabel in opts){
    result = result.filter(book => {
      return book[<keyof Book>filterLabel] === opts[<keyof Filters>filterLabel]
    })
  }

  return result
}
