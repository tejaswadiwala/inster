import logger from '../../logger'
import LoginRegistrationService from '../../services/loginRegistration/LoginRegistrationService'

export const login = async (
  loginRequest: LoginRequestDTO,
  requestId: string
): Promise<ApiResponse> => {
  const type = 'Routes.LoginRegistration.login'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const loginRegistrationService = new LoginRegistrationService(requestId)
    const response = await loginRegistrationService.login(loginRequest)

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return response
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
