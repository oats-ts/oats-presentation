import { ClientAdapter, RunnableOperation } from '@oats-ts/openapi-runtime'
import { AddBookOperation } from '../operations/AddBookOperation'
import { GetBookOperation } from '../operations/GetBookOperation'
import { GetBooksOperation } from '../operations/GetBooksOperation'
import { AddBookRequest } from '../requests/AddBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { GetBooksRequest } from '../requests/GetBooksRequest'
import { AddBookResponse } from '../responses/AddBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { BookStoreSdk } from './BookStoreSdk'

export class BookStoreSdkImpl implements BookStoreSdk {
  protected readonly adapter: ClientAdapter
  public constructor(adapter: ClientAdapter) {
    this.adapter = adapter
  }
  public async getBooks(request: GetBooksRequest): Promise<GetBooksResponse> {
    return this.createGetBooksOperation().run(request)
  }
  public async addBook(request: AddBookRequest): Promise<AddBookResponse> {
    return this.createAddBookOperation().run(request)
  }
  public async getBook(request: GetBookRequest): Promise<GetBookResponse> {
    return this.createGetBookOperation().run(request)
  }
  protected createGetBooksOperation(): RunnableOperation<GetBooksRequest, GetBooksResponse> {
    return new GetBooksOperation(this.adapter)
  }
  protected createAddBookOperation(): RunnableOperation<AddBookRequest, AddBookResponse> {
    return new AddBookOperation(this.adapter)
  }
  protected createGetBookOperation(): RunnableOperation<GetBookRequest, GetBookResponse> {
    return new GetBookOperation(this.adapter)
  }
}
