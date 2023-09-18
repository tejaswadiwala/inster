import { authenticate } from './authenticate'
import { LoginRequestDTO } from './dtos/LoginRequestDTO'
import { LoginResponseDTO } from './dtos/LoginResponseDTO'
import { RegistrationRequestDTO } from './dtos/RegistrationRequestDTO'
import { register } from './register'
import { signJWT } from './signJWT'

class LoginRegistrationService {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async register(registrationInformation: RegistrationRequestDTO) {
    return register(registrationInformation, this.requestId)
  }

  public async authenticate(loginRequest: LoginRequestDTO): Promise<boolean> {
    return authenticate(loginRequest, this.requestId)
  }

  public async signJWT(
    loginRequest: LoginRequestDTO
  ): Promise<LoginResponseDTO> {
    return signJWT(loginRequest, this.requestId)
  }
}

export default LoginRegistrationService
