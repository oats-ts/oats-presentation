import { dsl, serializers } from '@oats-ts/openapi-runtime'
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'

export const getBooksQuerySerializer = serializers.createQuerySerializer<GetBooksQueryParameters>({
  offset: dsl.query.form.primitive(dsl.value.number(), { required: false }),
})
