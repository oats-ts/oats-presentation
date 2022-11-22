import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-runtime'
import { IRouter, NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { AddBookServerRequest } from '../requests/AddBookServerRequest'
import { Book } from '../types/Book'
import { addBookRequestBodyValidator } from '../validators/addBookRequestBodyValidator'

export function createAddBookRouter(router?: IRouter | undefined): IRouter {
  return (router ?? Router()).post(
    '/books',
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      const toolkit: ExpressToolkit = { request, response, next }
      const adapter: ServerAdapter<ExpressToolkit> = response.locals['__oats_adapter_15ojy6m']
      const api: BookStoreApi = response.locals['__oats_api_15ojy6m']
      try {
        const mimeType = await adapter.getMimeType<'application/json'>(toolkit)
        const body = await adapter.getRequestBody<'application/json', Book>(
          toolkit,
          true,
          mimeType,
          addBookRequestBodyValidator,
        )
        const typedRequest: AddBookServerRequest = {
          mimeType,
          body,
        }
        const typedResponse = await api.addBook(typedRequest)
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
