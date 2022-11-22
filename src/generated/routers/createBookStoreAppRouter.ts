import { IRouter, Router } from 'express'
import { BookStoreRouterFactories } from './BookStoreRouterFactories'
import { createAddBookRouter } from './createAddBookRouter'
import { createGetBookRouter } from './createGetBookRouter'
import { createGetBooksRouter } from './createGetBooksRouter'

export function createBookStoreAppRouter(
  router?: IRouter | undefined,
  overrides: Partial<BookStoreRouterFactories> = {},
): IRouter {
  const root = router ?? Router()
  const factories = [
    overrides.createGetBooksRouter ?? createGetBooksRouter,
    overrides.createAddBookRouter ?? createAddBookRouter,
    overrides.createGetBookRouter ?? createGetBookRouter,
  ]
  const uniqueRouters = factories.map((factory) => factory(router)).filter((childRouter) => childRouter !== root)
  return uniqueRouters.length === 0 ? root : root.use(...uniqueRouters)
}
