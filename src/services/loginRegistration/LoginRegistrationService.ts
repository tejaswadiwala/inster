import { login } from './login'
import { register } from './register'

class LoginRegistrationService {
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

export default LoginRegistrationService
