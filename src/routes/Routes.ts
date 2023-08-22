import LoginRegistration from './loginRegistration/LoginRegistration'
import Post from './post/Post'

class Routes {
  private requestId: string
  public loginRegistration: LoginRegistration
  public post: Post

  constructor(requestId: string) {
    this.requestId = requestId
    this.loginRegistration = new LoginRegistration(this.requestId)
    this.post = new Post(requestId)
  }
}

export default Routes
