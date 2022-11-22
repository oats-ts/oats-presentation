import { dsl, serializers } from '@oats-ts/openapi-runtime'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export const getBooksRequestHeadersSerializer = serializers.createHeaderSerializer<GetBooksRequestHeaderParameters>({
  'x-limit': dsl.header.simple.primitive(dsl.value.number(), { required: false }),
})
