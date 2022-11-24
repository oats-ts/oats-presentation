import { Failure } from '@oats-ts/openapi-runtime'
import { isSuccess } from '@oats-ts/try'
import { BookStoreApi } from './generated/api/BookStoreApi'
import { AddBookServerRequest } from './generated/requests/AddBookServerRequest'
import { GetBookServerRequest } from './generated/requests/GetBookServerRequest'
import { GetBooksServerRequest } from './generated/requests/GetBooksServerRequest'
import { AddBookResponse } from './generated/responses/AddBookResponse'
import { GetBookResponse } from './generated/responses/GetBookResponse'
import { GetBooksResponse } from './generated/responses/GetBooksResponse'
import { AppError } from './generated/types/AppError'
import { Book } from './generated/types/Book'

export class BookStoreApiImpl implements BookStoreApi {
  private readonly books: Book[] = [
    {
      id: 1,
      author: 'Balazs Edes',
      price: 10,
      title: 'Sample book',
      description: 'This is a sample book',
    },
  ]

  async getBooks(_request: GetBooksServerRequest): Promise<GetBooksResponse> {
    return {
      statusCode: 200,
      mimeType: 'application/json',
      body: this.books,
      headers: {
        'x-length': this.books.length,
      },
    }
  }

  async addBook(request: AddBookServerRequest): Promise<AddBookResponse> {
    if (isSuccess(request.body)) {
      const lastId = this.books.reduce((id, book) => Math.max(id, book.id), 0)
      const book: Book = { ...request.body.data, id: lastId + 1 }
      this.books.push(book)
      return {
        statusCode: 201,
        mimeType: 'application/json',
        body: book,
      }
    }
    return {
      statusCode: 400,
      mimeType: 'application/json',
      body: this.failureToAppErrors(request.body),
    }
  }

  async getBook(request: GetBookServerRequest): Promise<GetBookResponse> {
    if (isSuccess(request.path)) {
      const { bookId } = request.path.data
      const book = this.books.find((b) => b.id === bookId)
      if (book === undefined) {
        return {
          statusCode: 400,
          mimeType: 'application/json',
          body: [{ message: `book with id ${bookId} doesn't exist` }],
        }
      }
      return {
        statusCode: 200,
        mimeType: 'application/json',
        body: book,
      }
    }
    return {
      statusCode: 400,
      mimeType: 'application/json',
      body: this.failureToAppErrors(request.path),
    }
  }

  private failureToAppErrors(failure: Failure): AppError[] {
    return failure.issues.map(
      (issue): AppError => ({
        message: `${issue.severity} in ${issue.path}: ${issue.message}`,
      }),
    )
  }
}
