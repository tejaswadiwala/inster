import logger from '../../logger'
import LoginRegistrationService from '../../services/loginRegistration/LoginRegistrationService'

export const register = async (
  registrationInformation: RegistrationRequestDTO,
  requestId: string
) => {
  const type = 'Routes.LoginRegistration.register'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const loginRegistrationService = new LoginRegistrationService(requestId)
    await loginRegistrationService.register(registrationInformation)

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
