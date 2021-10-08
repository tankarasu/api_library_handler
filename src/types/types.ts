// Third-party requirements
import { RouteGenericInterface } from "fastify/types/route";

export interface Book{
  name: string,
  id: number
}

export interface BookRequest extends RouteGenericInterface{
  params: {
    id: string
  }
}
