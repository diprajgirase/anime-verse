export type ErrorResponse = {
  message: string
  code: string
  status: number
}

export class AppError extends Error {
  code: string
  status: number

  constructor(message: string, code = 'INTERNAL_ERROR', status = 500) {
    super(message)
    this.code = code
    this.status = status
    this.name = 'AppError'
  }
}
