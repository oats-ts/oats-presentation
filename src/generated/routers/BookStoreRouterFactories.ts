import { IRouter } from 'express'

export type BookStoreRouterFactories = {
  createGetBooksRouter: (router?: IRouter | undefined) => IRouter
  createAddBookRouter: (router?: IRouter | undefined) => IRouter
  createGetBookRouter: (router?: IRouter | undefined) => IRouter
}
