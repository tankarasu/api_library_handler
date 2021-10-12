// Third-party requirements
import { RouteGenericInterface } from "fastify/types/route";

export interface Book{
  id: number,
  name: string,
  category: string,
  author: string,
  year: number,
}

export interface BookRequest extends RouteGenericInterface{
  Querystring: {
    category?: string
    name?: string
    author?: string
    year?: string
  }
  Params: {
    id: string
  }
}

export enum kBookType{
  ROMAN = 'roman',
  THRILLER = 'thriller',
  DRAMA = 'drama',
  CARTOON = 'cartoon'
}
