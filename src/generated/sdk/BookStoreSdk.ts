import { AddBookRequest } from '../requests/AddBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { GetBooksRequest } from '../requests/GetBooksRequest'
import { AddBookResponse } from '../responses/AddBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'

export type BookStoreSdk = {
  /**
   * Returns a list of books, can be paginated
   */
  getBooks(request: GetBooksRequest): Promise<GetBooksResponse>
  /**
   * Creates a new book based on the request body.
   */
  addBook(request: AddBookRequest): Promise<AddBookResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(request: GetBookRequest): Promise<GetBookResponse>
}
