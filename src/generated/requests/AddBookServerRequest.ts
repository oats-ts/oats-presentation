import { Try } from '@oats-ts/openapi-runtime'
import { Book } from '../types/Book'

export type AddBookServerRequest = {
  mimeType: 'application/json'
  body: Try<Book>
}
