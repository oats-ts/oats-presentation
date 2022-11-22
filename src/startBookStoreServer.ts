import express from 'express'
import { Server } from 'http'
import { ExpressServerAdapter, jsonBodyParser } from '@oats-ts/openapi-express-server-adapter'
import { BookStoreApiImpl } from './BookStoreApiImpl'
import { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'
import { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'
import { PORT } from './constants'

export function startBookStoreServer(port: number = PORT): Server {
  const app = express()

  app.use(jsonBodyParser())
  app.use(createBookStoreContextRouter(undefined, new BookStoreApiImpl(), new ExpressServerAdapter()))
  app.use(createBookStoreAppRouter())

  return app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
}
