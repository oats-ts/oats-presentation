import { Book } from '../types/Book'

export function isBook(input: any): input is Book {
  return (
    input !== null &&
    typeof input === 'object' &&
    typeof input.author === 'string' &&
    (input.description === null || input.description === undefined || typeof input.description === 'string') &&
    typeof input.id === 'number' &&
    typeof input.price === 'number' &&
    typeof input.title === 'string'
  )
}
