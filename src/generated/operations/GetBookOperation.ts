import {
  ClientAdapter,
  HttpMethod,
  RawHttpHeaders,
  RawHttpRequest,
  RawHttpResponse,
  RunnableOperation,
} from '@oats-ts/openapi-runtime'
import { GetBookRequest } from '../requests/GetBookRequest'
import { GetBookResponse } from '../responses/GetBookResponse'
import { getBookPathSerializer } from '../serializers/getBookPathSerializer'
import { getBookResponseBodyValidator } from '../validators/getBookResponseBodyValidator'

/**
 * Returns the book associated with the given bookId
 */
export class GetBookOperation implements RunnableOperation<GetBookRequest, GetBookResponse> {
  protected readonly adapter: ClientAdapter
  public constructor(adapter: ClientAdapter) {
    this.adapter = adapter
  }
  protected getUrl(request: GetBookRequest): string {
    const path = this.adapter.getPath(request.path, getBookPathSerializer)
    return this.adapter.getUrl(path, undefined)
  }
  protected getHttpMethod(_request: GetBookRequest): HttpMethod {
    return 'get'
  }
  protected getRequestHeaders(_request: GetBookRequest): RawHttpHeaders {
    return this.adapter.getRequestHeaders(undefined, undefined, undefined, undefined)
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
      getBookResponseBodyValidator,
    )
  }
  public async run(request: GetBookRequest): Promise<GetBookResponse> {
    const rawRequest: RawHttpRequest = {
      url: this.getUrl(request),
      method: this.getHttpMethod(request),
      headers: this.getRequestHeaders(request),
    }
    const rawResponse = await this.adapter.request(rawRequest)
    const typedResponse = {
      mimeType: this.getMimeType(rawResponse),
      statusCode: this.getStatusCode(rawResponse),
      body: this.getResponseBody(rawResponse),
    }
    return typedResponse as GetBookResponse
  }
}
