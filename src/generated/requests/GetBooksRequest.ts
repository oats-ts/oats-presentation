import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export type GetBooksRequest = {
  headers?: GetBooksRequestHeaderParameters
  query?: GetBooksQueryParameters
}
