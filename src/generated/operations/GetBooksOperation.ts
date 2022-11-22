import {
  ClientAdapter,
  HttpMethod,
  RawHttpHeaders,
  RawHttpRequest,
  RawHttpResponse,
  RunnableOperation,
} from '@oats-ts/openapi-runtime'
import { GetBooksRequest } from '../requests/GetBooksRequest'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { getBooksQuerySerializer } from '../serializers/getBooksQuerySerializer'
import { getBooksRequestHeadersSerializer } from '../serializers/getBooksRequestHeadersSerializer'
import { getBooksResponseHeadersDeserializer } from '../serializers/getBooksResponseHeadersDeserializer'
import { getBooksResponseBodyValidator } from '../validators/getBooksResponseBodyValidator'

/**
 * Returns a list of books, can be paginated
 */
export class GetBooksOperation implements RunnableOperation<GetBooksRequest, GetBooksResponse> {
  protected readonly adapter: ClientAdapter
  public constructor(adapter: ClientAdapter) {
    this.adapter = adapter
  }
  protected getUrl(request: GetBooksRequest): string {
    const query = this.adapter.getQuery(request.query, getBooksQuerySerializer)
    return this.adapter.getUrl('/books', query)
  }
  protected getHttpMethod(_request: GetBooksRequest): HttpMethod {
    return 'get'
  }
  protected getRequestHeaders(request: GetBooksRequest): RawHttpHeaders {
    return this.adapter.getRequestHeaders(request.headers, undefined, undefined, getBooksRequestHeadersSerializer)
  }
  protected getMimeType(response: RawHttpResponse): string | undefined {
    return this.adapter.getMimeType(response)
  }
  protected getStatusCode(response: RawHttpResponse): number | undefined {
    return this.adapter.getStatusCode(response)
  }
  protected getResponseHeaders(response: RawHttpResponse): RawHttpHeaders {
    return this.adapter.getResponseHeaders(response, this.getStatusCode(response), getBooksResponseHeadersDeserializer)
  }
  protected getResponseBody(response: RawHttpResponse): any {
    return this.adapter.getResponseBody(
      response,
      this.getStatusCode(response),
      this.getMimeType(response),
      getBooksResponseBodyValidator,
    )
  }
  public async run(request: GetBooksRequest): Promise<GetBooksResponse> {
    const rawRequest: RawHttpRequest = {
      url: this.getUrl(request),
      method: this.getHttpMethod(request),
      headers: this.getRequestHeaders(request),
    }
    const rawResponse = await this.adapter.request(rawRequest)
    const typedResponse = {
      mimeType: this.getMimeType(rawResponse),
      statusCode: this.getStatusCode(rawResponse),
      headers: this.getResponseHeaders(rawResponse),
      body: this.getResponseBody(rawResponse),
    }
    return typedResponse as GetBooksResponse
  }
}
