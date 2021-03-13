/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express'

export const handler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  const handler = async () => {
    const result = await fn(req, res, next)
    if (!result) {
      res.status(204).send()
    } else {
      res.status(200).send(result)
    }
  }
  return Promise.resolve(handler()).catch(next)
}

export const rawHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  const handler = () => fn(req, res, next)
  return Promise.resolve(handler()).catch(next)
}
