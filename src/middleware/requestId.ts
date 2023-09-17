import { v4 as uuidv4 } from 'uuid'
import { NextFunction, Request, Response } from 'express'

// Define a custom Request type that includes the 'requestId' property.
export interface CustomRequest extends Request {
  requestId?: string
}

/**
 * Middleware to create a requestID and attach it as a property to the request
 * object.
 */
export function requestId(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  req.requestId = uuidv4()
  next()
}
