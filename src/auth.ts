import { NextFunction, Request, Response } from 'express'
import jwt2 from 'jsonwebtoken'
import logger from './logger'
import { PUBLIC_KEY } from './config'

export function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const type = 'verifyTokenMiddleware'
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    const verifiedPayload = verifyJWT(token)
    if (verifiedPayload) {
      next()
    } else {
      logger.warn({
        message: `${type}: Invalid token.`,
        type: type,
      })
      logger.debug({
        message: `${type}: Invalid token.`,
        type: type,
        req: req,
      })
      res.status(401).json({ error: 'Invalid token.' })
    }
  } else {
    logger.warn({
      message: `${type}: No token provided.`,
      type: type,
    })
    logger.debug({
      message: `${type}: No token provided.`,
      type: type,
      req: req,
    })
    res.status(401).json({ error: 'No token provided.' })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyJWT(token: string): any {
  const type = 'verifyJWT'
  try {
    const publicKey = PUBLIC_KEY as string
    const decodedJWT = jwt2.verify(token, publicKey, { algorithms: ['RS256'] })
    return decodedJWT
  } catch (error) {
    // Handle verification error
    logger.error({
      message: `${type}: JWT verification failed.`,
      type: type,
      error: error,
    })
    return null
  }
}
