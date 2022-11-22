import { validators } from '@oats-ts/openapi-runtime'
import { appErrorTypeValidator } from './appErrorTypeValidator'
import { bookTypeValidator } from './bookTypeValidator'

export const getBookResponseBodyValidator = {
  200: { 'application/json': validators.lazy(() => bookTypeValidator) },
  400: { 'application/json': validators.array(validators.items(validators.lazy(() => appErrorTypeValidator))) },
  500: { 'application/json': validators.array(validators.items(validators.lazy(() => appErrorTypeValidator))) },
} as const
