import { validators } from '@oats-ts/openapi-runtime'

export const appErrorTypeValidator = validators.object(validators.shape({ message: validators.string() }))
