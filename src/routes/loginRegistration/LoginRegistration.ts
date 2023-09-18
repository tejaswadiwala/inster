import { LoginRequestDTO } from '../../services/loginRegistration/dtos/LoginRequestDTO'
import { LoginResponseDTO } from '../../services/loginRegistration/dtos/LoginResponseDTO'
import { RegistrationRequestDTO } from '../../services/loginRegistration/dtos/RegistrationRequestDTO'
import { login } from './login'
import { register } from './register'

class LoginRegistration {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async register(registrationInformation: RegistrationRequestDTO) {
    return register(registrationInformation, this.requestId)
  }

  public async login(loginRequest: LoginRequestDTO): Promise<LoginResponseDTO> {
    return login(loginRequest, this.requestId)
  }
}

export default LoginRegistration
