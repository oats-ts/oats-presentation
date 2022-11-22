import { validators } from '@oats-ts/openapi-runtime'
import { appErrorTypeValidator } from './appErrorTypeValidator'
import { bookTypeValidator } from './bookTypeValidator'

export const addBookResponseBodyValidator = {
  201: { 'application/json': validators.lazy(() => bookTypeValidator) },
  400: { 'application/json': validators.array(validators.items(validators.lazy(() => appErrorTypeValidator))) },
  500: { 'application/json': validators.array(validators.items(validators.lazy(() => appErrorTypeValidator))) },
} as const
