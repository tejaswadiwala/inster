import logger from '../../logger'
import PsqlDbController from '../../psql/PsqlDbController'
import pool from '../../psql/psqlAuth'
import { QueryResult } from 'pg'
import crypto from 'crypto'

export const authenticate = async (
  loginRequest: LoginRequestDTO,
  requestId: string
): Promise<boolean> => {
  const type = 'LoginRegistrationService.authenticate'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now, authenticating username - ${loginRequest.username}.`,
      requestId: requestId,
    })

    let isUserAuthenticated: boolean = false

    const psqlDbController: PsqlDbController = new PsqlDbController(
      pool,
      requestId
    )
    const queryResult: QueryResult = await psqlDbController.authenticateUser(
      loginRequest
    )

    if (queryResult.rowCount === 1) {
      const storedHashedPassword = queryResult.rows[0].password_hash

      const hashedPassword = crypto
        .createHash('sha256')
        .update(loginRequest.password)
        .digest('hex')

      if (storedHashedPassword === hashedPassword) {
        isUserAuthenticated = true
      }
    }

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return isUserAuthenticated
  } catch (error) {
    logger.error({
      type: type,
      message: `${type}: Error occurred.`,
      error: error,
      requestId: requestId,
    })
    throw error
  }
}
