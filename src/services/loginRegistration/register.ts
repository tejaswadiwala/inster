import logger from '../../logger'
import crypto from 'crypto'

const USERS = []

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

    // Store user in the in-memory database
    USERS.push({
      username: registrationInformation.username,
      password: hashedPassword,
      email: registrationInformation.email,
    })

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
