import { register } from './register'

class LoginRegistrationService {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async register(registrationInformation: RegistrationRequestDTO) {
    return register(registrationInformation, this.requestId)
  }
}

export default LoginRegistrationService
