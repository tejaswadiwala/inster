import LoginRegistration from './loginRegistration/LoginRegistration'

class Routes {
  private requestId: string
  public loginRegistration: LoginRegistration

  constructor(requestId: string) {
    this.requestId = requestId
    this.loginRegistration = new LoginRegistration(this.requestId)
  }
}

export default Routes
