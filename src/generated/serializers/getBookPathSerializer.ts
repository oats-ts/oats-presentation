import { dsl, serializers } from '@oats-ts/openapi-runtime'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export const getBookPathSerializer = serializers.createPathSerializer<GetBookPathParameters>(
  { bookId: dsl.path.simple.primitive(dsl.value.number()) },
  '/books/{bookId}',
)
