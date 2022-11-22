import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { ServerAdapter } from '@oats-ts/openapi-runtime'
import { IRouter, NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'

export function createBookStoreContextRouter(
  router: IRouter | undefined,
  api: BookStoreApi,
  adapter: ServerAdapter<ExpressToolkit>,
): IRouter {
  return (router ?? Router()).use((_: Request, response: Response, next: NextFunction) => {
    response.locals['__oats_api_15ojy6m'] = api
    response.locals['__oats_adapter_15ojy6m'] = adapter
    next()
  })
}
