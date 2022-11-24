import { createHttpTerminator, HttpTerminator } from 'http-terminator'
import { startBookStoreServer } from './startBookStoreServer'
import { PORT } from './constants'
import { BookStoreSdkImpl } from './generated/sdk/BookStoreSdkImpl'
import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'

describe('Book store', () => {
  let terminator!: HttpTerminator
  const sdk = new BookStoreSdkImpl(new FetchClientAdapter({ url: `http://localhost:${PORT}` }))

  beforeAll(() => {
    const server = startBookStoreServer(PORT)
    terminator = createHttpTerminator({
      server,
      gracefulTerminationTimeout: 500,
    })
  })

  afterAll(async () => terminator.terminate())

  it('should be able to create a book and then query it', async () => {
    // Create a new Book
    const newBookResponse = await sdk.addBook({
      mimeType: 'application/json',
      body: {
        id: -1,
        author: 'Presentation people',
        price: 1,
        title: 'Demo',
        description: 'The description',
      },
    })

    if (newBookResponse.statusCode !== 201) {
      throw newBookResponse
    }

    expect(newBookResponse.body.author).toBe('Presentation people')
    expect(newBookResponse.body.price).toBe(1)
    expect(newBookResponse.body.title).toBe('Demo')
    expect(newBookResponse.body.description).toBe('The description')

    // Query the newly created book

    const bookResponse = await sdk.getBook({
      path: { bookId: newBookResponse.body.id },
    })

    if (bookResponse.statusCode !== 200) {
      throw bookResponse
    }

    expect(bookResponse.body).toEqual(newBookResponse.body)
  })
})
