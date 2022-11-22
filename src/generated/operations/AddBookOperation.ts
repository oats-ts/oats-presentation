import {
  ClientAdapter,
  HttpMethod,
  RawHttpHeaders,
  RawHttpRequest,
  RawHttpResponse,
  RunnableOperation,
} from '@oats-ts/openapi-runtime'
import { AddBookRequest } from '../requests/AddBookRequest'
import { AddBookResponse } from '../responses/AddBookResponse'
import { addBookResponseBodyValidator } from '../validators/addBookResponseBodyValidator'

/**
 * Creates a new book based on the request body.
 */
export class AddBookOperation implements RunnableOperation<AddBookRequest, AddBookResponse> {
  protected readonly adapter: ClientAdapter
  public constructor(adapter: ClientAdapter) {
    this.adapter = adapter
  }
  protected getUrl(_request: AddBookRequest): string {
    return this.adapter.getUrl('/books', undefined)
  }
  protected getHttpMethod(_request: AddBookRequest): HttpMethod {
    return 'post'
  }
  protected getRequestHeaders(request: AddBookRequest): RawHttpHeaders {
    return this.adapter.getRequestHeaders(undefined, request.mimeType, undefined, undefined)
  }
  protected getRequestBody(request: AddBookRequest): any {
    return this.adapter.getRequestBody(request.mimeType, request.body)
  }
  protected getMimeType(response: RawHttpResponse): string | undefined {
    return this.adapter.getMimeType(response)
  }
  protected getStatusCode(response: RawHttpResponse): number | undefined {
    return this.adapter.getStatusCode(response)
  }
  protected getResponseBody(response: RawHttpResponse): any {
    return this.adapter.getResponseBody(
      response,
      this.getStatusCode(response),
      this.getMimeType(response),
      addBookResponseBodyValidator,
    )
  }
  public async run(request: AddBookRequest): Promise<AddBookResponse> {
    const rawRequest: RawHttpRequest = {
      url: this.getUrl(request),
      method: this.getHttpMethod(request),
      headers: this.getRequestHeaders(request),
      body: this.getRequestBody(request),
    }
    const rawResponse = await this.adapter.request(rawRequest)
    const typedResponse = {
      mimeType: this.getMimeType(rawResponse),
      statusCode: this.getStatusCode(rawResponse),
      body: this.getResponseBody(rawResponse),
    }
    return typedResponse as AddBookResponse
  }
}
