import { authenticate } from './authenticate'
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
