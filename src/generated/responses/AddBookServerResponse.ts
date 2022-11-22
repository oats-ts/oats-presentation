import { AppError } from '../types/AppError'
import { Book } from '../types/Book'

export type AddBookServerResponse =
  | {
      statusCode: 201
      mimeType: 'application/json'
      body: Book
    }
  | {
      statusCode: 400
      mimeType: 'application/json'
      body: AppError[]
    }
  | {
      statusCode: 500
      mimeType: 'application/json'
      body: AppError[]
    }
