import { deserializers, dsl } from '@oats-ts/openapi-runtime'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export const getBooksRequestHeadersDeserializer =
  deserializers.createHeaderDeserializer<GetBooksRequestHeaderParameters>({
    'x-limit': dsl.header.simple.primitive(dsl.value.number(), { required: false }),
  })
