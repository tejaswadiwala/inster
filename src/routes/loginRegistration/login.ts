import logger from '../../logger'
import LoginRegistrationService from '../../services/loginRegistration/LoginRegistrationService'
import { LoginRequestDTO } from '../../services/loginRegistration/dtos/LoginRequestDTO'
import { LoginResponseDTO } from '../../services/loginRegistration/dtos/LoginResponseDTO'

export const login = async (
  loginRequest: LoginRequestDTO,
  requestId: string
): Promise<LoginResponseDTO> => {
  const type = 'Routes.LoginRegistration.login'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const loginRegistrationService = new LoginRegistrationService(requestId)
    const isUserAuthenticated = await loginRegistrationService.authenticate(
      loginRequest
    )
    if (isUserAuthenticated) {
      const loginResponse: LoginResponseDTO =
        await loginRegistrationService.signJWT(loginRequest)
      logger.info({
        type: type,
        message: `${type}: Successfully completed execution.`,
        requestId: requestId,
      })
      return loginResponse
    } else {
      logger.info({
        type: type,
        message: `${type}: Successfully completed execution.`,
        requestId: requestId,
      })
      throw new Error('User not authenticated.')
    }
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
