import { deserializers, dsl } from '@oats-ts/openapi-runtime'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export const getBookPathDeserializer = deserializers.createPathDeserializer<GetBookPathParameters>(
  { bookId: dsl.path.simple.primitive(dsl.value.number()) },
  ['bookId'],
  /^\/books(?:\/([^\/#\?]+?))[\/#\?]?$/i,
)
