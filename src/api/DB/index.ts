// Internals requirements
import { fakeDatabase } from "../../utils/fakeDatabase";
import {Book, Filters} from "../../types/types"

export function getFilteredDB(opts?: Filters): Array<Book>{
let result: Array<Book> = fakeDatabase

  for(const label in opts){
    result = result.filter(book => {
      const bookValue = book[<keyof Book>label]
      const labelValue = (opts[<keyof Filters>label])

      if(label !== "id") return String(bookValue).includes(String(labelValue)!)
      else return book[<keyof Book>label] === (opts[<keyof Filters>label])
    })
  }

  return result
}
