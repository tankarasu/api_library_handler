// Third-party requirements
import {RouteGenericInterface} from "fastify/types/route";

export type kBookType = "roman" | "thriller" | "drama" | "cartoon"

export interface Book{
  id: number,
  name: string,
  category: kBookType,
  author: string,
  year: number,
}

export type Filters = {
    id?: string | number;
    author?: string;
    category?: string;
    name?: string;
    year?: string | number;
  }

export interface BookRequest extends RouteGenericInterface{
  Querystring: Filters;
  Params: {
    term?: string
  }
}

export type BookStatistic = { [key in kBookType as key]: number };

export interface Statistic {
  totalBooks: number;
  totalBooksByCategory: BookStatistic;
  percentageByCategory: BookStatistic
}
