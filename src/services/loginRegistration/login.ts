import logger from '../../logger'
import PsqlDbController from '../../psql/PsqlDbController'
import pool from '../../psql/psqlAuth'
import { QueryResult } from 'pg'
import crypto from 'crypto'

export const login = async (
  loginRequest: LoginRequestDTO,
  requestId: string
): Promise<ApiResponse> => {
  const type = 'LoginRegistrationService.login'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now, logging in username - ${loginRequest.username}.`,
      requestId: requestId,
    })

    let apiResponse: ApiResponse = {
      data: 'Cannot login.',
      statusCode: 400,
    }

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
        apiResponse = {
          data: 'User successfully logged in.',
          statusCode: 200,
        }
      }
    }

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return apiResponse
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
