import { deserializers, dsl } from '@oats-ts/openapi-runtime'
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'

export const getBooksQueryDeserializer = deserializers.createQueryDeserializer<GetBooksQueryParameters>({
  offset: dsl.query.form.primitive(dsl.value.number(), { required: false }),
})
