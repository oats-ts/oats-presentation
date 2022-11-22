import { Try } from '@oats-ts/openapi-runtime'
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export type GetBooksServerRequest = {
  headers: Try<GetBooksRequestHeaderParameters>
  query: Try<GetBooksQueryParameters>
}
