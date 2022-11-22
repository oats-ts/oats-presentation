import { Book } from '../types/Book'

export type AddBookRequest = {
  mimeType: 'application/json'
  body: Book
}
