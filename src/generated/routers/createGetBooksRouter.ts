import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-runtime'
import { IRouter, NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { GetBooksServerRequest } from '../requests/GetBooksServerRequest'
import { getBooksQueryDeserializer } from '../serializers/getBooksQueryDeserializer'
import { getBooksRequestHeadersDeserializer } from '../serializers/getBooksRequestHeadersDeserializer'
import { getBooksResponseHeadersSerializer } from '../serializers/getBooksResponseHeadersSerializer'

export function createGetBooksRouter(router?: IRouter | undefined): IRouter {
  return (router ?? Router()).get(
    '/books',
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const toolkit: ExpressToolkit = { request, response, next }
      const adapter: ServerAdapter<ExpressToolkit> = response.locals['__oats_adapter_15ojy6m']
      const api: BookStoreApi = response.locals['__oats_api_15ojy6m']
      try {
        const query = await adapter.getQueryParameters(toolkit, getBooksQueryDeserializer)
        const headers = await adapter.getRequestHeaders(toolkit, getBooksRequestHeadersDeserializer)
        const typedRequest: GetBooksServerRequest = {
          query,
          headers,
        }
        const typedResponse = await api.getBooks(typedRequest)
        const rawResponse: RawHttpResponse = {
          headers: await adapter.getResponseHeaders(
            toolkit,
            typedResponse,
            getBooksResponseHeadersSerializer,
            undefined,
          ),
          statusCode: await adapter.getStatusCode(toolkit, typedResponse),
          body: await adapter.getResponseBody(toolkit, typedResponse),
        }
        await adapter.respond(toolkit, rawResponse)
      } catch (error) {
        adapter.handleError(toolkit, error)
      }
    },
  )
}
