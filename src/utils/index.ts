// Third-party requirements
import { FastifyRequest } from "fastify";

// Internals requirement
import { BookRequest } from "../types/types";

export function throwError(message: string) {
  throw new Error(message);
}

export function formatQueryString(request: FastifyRequest<BookRequest, import("http").Server, import("http").IncomingMessage>) {
  if (request.query.id) {
    request.query.id = parseInt(request.query.id as string);
  }

  if (request.query.year) {
    request.query.year = parseInt(request.query.year as string);
  }
}
