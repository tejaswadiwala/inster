import logger from '../../logger'
import crypto from 'crypto'
import PsqlDbController from '../../psql/PsqlDbController'
import pool from '../../psql/psqlAuth'

export const register = async (
  registrationInformation: RegistrationRequestDTO,
  requestId: string
) => {
  const type = 'LoginRegistrationService.register'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now, registering username - ${registrationInformation.username}.`,
      requestId: requestId,
    })

    // Hash the password using crypto
    const hashedPassword = crypto
      .createHash('sha256')
      .update(registrationInformation.password)
      .digest('hex')

    registrationInformation.password = hashedPassword

    const psqlDbController: PsqlDbController = new PsqlDbController(
      pool,
      requestId
    )
    await psqlDbController.insertUser(registrationInformation)

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
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
