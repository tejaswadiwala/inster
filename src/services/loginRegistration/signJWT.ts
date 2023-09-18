import { PRIVATE_KEY } from '../../config'
import logger from '../../logger'
import jwt2 from 'jsonwebtoken'
import { LoginRequestDTO } from './dtos/LoginRequestDTO'
import { LoginResponseDTO } from './dtos/LoginResponseDTO'

export const signJWT = async (
  loginRequest: LoginRequestDTO,
  requestId: string
): Promise<LoginResponseDTO> => {
  const type = 'LoginRegistrationService.signJWT'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now, signing JWT for username - ${loginRequest.username}.`,
      requestId: requestId,
    })

    const token = jwt2.sign(
      { username: loginRequest.username },
      PRIVATE_KEY as string,
      {
        algorithm: 'RS256',
        expiresIn: '5h', // Set token expiration time
      }
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return { token: token }
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
