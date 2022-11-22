import { validators } from '@oats-ts/openapi-runtime'
import { bookTypeValidator } from './bookTypeValidator'

export const addBookRequestBodyValidator = { 'application/json': validators.lazy(() => bookTypeValidator) } as const
