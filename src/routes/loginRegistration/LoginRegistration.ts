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

  public async login(loginRequest: LoginRequestDTO): Promise<ApiResponse> {
    return login(loginRequest, this.requestId)
  }
}

export default LoginRegistration
