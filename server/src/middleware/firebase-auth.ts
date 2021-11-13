import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'
import config from '../config'

declare global {
  namespace Express {
    interface Request {
      user: admin.auth.DecodedIdToken
    }
  }
}

if (config.isProduction) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.FIREBASE_PROJECT_ID,
      privateKey: config.FIREBASE_PRIVATE_KEY,
      clientEmail: config.FIREBASE_CLIENT_EMAIL,
    }),
  })
} else {
  admin.initializeApp({
    projectId: config.FIREBASE_PROJECT_ID,
  })
}

const getAuthToken = (req: Request) => {
  const { authorization } = req.headers

  if (!authorization) return

  return authorization.split(' ')[1]
}

export async function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = await getAuthToken(req)

  if (!token) {
    return res.status(401).send({ message: 'Not authorized' })
  }

  try {
    req.user = await admin.auth().verifyIdToken(token, true)
    return next()
  } catch (error) {
    if (error.code == 'auth/id-token-revoked') {
      return res.status(401).send({ message: 'Not authorized, token revoked' })
    }
    return res.status(401).send({ message: 'Not authorized' })
  }
}
