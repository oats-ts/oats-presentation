import { dsl, serializers } from '@oats-ts/openapi-runtime'
import { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'

export const getBooksResponseHeadersSerializer = {
  200: serializers.createHeaderSerializer<GetBooks200ResponseHeaderParameters>({
    'x-length': dsl.header.simple.primitive(dsl.value.number(), { required: true }),
  }),
} as const
