import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-runtime'
import { IRouter, NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { GetBookServerRequest } from '../requests/GetBookServerRequest'
import { getBookPathDeserializer } from '../serializers/getBookPathDeserializer'

export function createGetBookRouter(router?: IRouter | undefined): IRouter {
  return (router ?? Router()).get(
    '/books/:bookId',
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const toolkit: ExpressToolkit = { request, response, next }
      const adapter: ServerAdapter<ExpressToolkit> = response.locals['__oats_adapter_15ojy6m']
      const api: BookStoreApi = response.locals['__oats_api_15ojy6m']
      try {
        const path = await adapter.getPathParameters(toolkit, getBookPathDeserializer)
        const typedRequest: GetBookServerRequest = {
          path,
        }
        const typedResponse = await api.getBook(typedRequest)
        const rawResponse: RawHttpResponse = {
          headers: await adapter.getResponseHeaders(toolkit, typedResponse, undefined, undefined),
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
