/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

export class HttpException extends Error {
  statusCode: number
  message: string
  error: string | null

  constructor(statusCode: number, message: string, error?: string) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.error = error || null
  }
}

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || 500
  const message = error.message || "It's not you. It's us. We are having some problems."

  if (status === 500) {
    console.error(error)
  }

  response.status(status).send({ message })
}
