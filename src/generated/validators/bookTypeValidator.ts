import { validators } from '@oats-ts/openapi-runtime'

export const bookTypeValidator = validators.object(
  validators.shape({
    author: validators.string(),
    description: validators.optional(validators.string()),
    id: validators.number(),
    price: validators.number(),
    title: validators.string(),
  }),
)
