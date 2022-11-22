import { AddBookServerRequest } from '../requests/AddBookServerRequest'
import { GetBookServerRequest } from '../requests/GetBookServerRequest'
import { GetBooksServerRequest } from '../requests/GetBooksServerRequest'
import { AddBookServerResponse } from '../responses/AddBookServerResponse'
import { GetBookServerResponse } from '../responses/GetBookServerResponse'
import { GetBooksServerResponse } from '../responses/GetBooksServerResponse'

export type BookStoreApi = {
  /**
   * Returns a list of books, can be paginated
   */
  getBooks(request: GetBooksServerRequest): Promise<GetBooksServerResponse>
  /**
   * Creates a new book based on the request body.
   */
  addBook(request: AddBookServerRequest): Promise<AddBookServerResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(request: GetBookServerRequest): Promise<GetBookServerResponse>
}
