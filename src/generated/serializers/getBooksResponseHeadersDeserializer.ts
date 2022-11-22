import { deserializers, dsl } from '@oats-ts/openapi-runtime'
import { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'

export const getBooksResponseHeadersDeserializer = {
  200: deserializers.createHeaderDeserializer<GetBooks200ResponseHeaderParameters>({
    'x-length': dsl.header.simple.primitive(dsl.value.number(), { required: true }),
  }),
} as const
