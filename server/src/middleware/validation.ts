import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'

export async function executeValidation(
  schemas: ValidationChain[],
  req: Partial<Request>,
  checkExtraFields = true,
) {
  if (checkExtraFields) {
    const hasExtraFields = checkIfExtraFields(req, schemas)
    if (hasExtraFields) {
      throw new Error('Unkown field')
    }
  }
  await Promise.all(schemas.map((schema) => schema.run(req)))
  return validationResult(req)
}

export const validate = (schemas: ValidationChain[], checkExtraFields?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await executeValidation(schemas, req, checkExtraFields)
      if (errors.isEmpty()) {
        return next()
      }
      return res.status(400).send({ message: 'Invalid field(s)', errors: errors.mapped() })
    } catch (err) {
      return res.status(400).send({ message: err.message })
    }
  }
}

function checkIfExtraFields(req: Partial<Request>, validators: ValidationChain[]) {
  const allowedFields = validators.reduce((fields: string[], rule) => {
    return [...fields, ...rule.builder.build().fields]
  }, [])

  const requestInput = { ...req.query, ...req.params, ...req.body }

  for (const field of Object.keys(requestInput)) {
    if (!allowedFields.includes(field)) {
      return true
    }
  }
  return false
}
