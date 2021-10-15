// Third-party requirements
import { RouteGenericInterface } from "fastify/types/route";

export type kBookType = "roman" | "thriller" | "drama" | "cartoon"

export interface Book{
  id: number,
  name: string,
  category: kBookType,
  author: string,
  year: number,
}

export interface BookRequest extends RouteGenericInterface{
  Querystring: {
    category?: kBookType
    name?: string
    author?: string
    year?: string
  }
  Params: {
    id: string
  }
}
