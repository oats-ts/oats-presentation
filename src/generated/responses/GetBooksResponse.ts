import { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'
import { AppError } from '../types/AppError'
import { Book } from '../types/Book'

export type GetBooksResponse =
  | {
      statusCode: 200
      mimeType: 'application/json'
      body: Book[]
      headers: GetBooks200ResponseHeaderParameters
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
