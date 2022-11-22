import { Try } from '@oats-ts/openapi-runtime'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export type GetBookServerRequest = {
  path: Try<GetBookPathParameters>
}
