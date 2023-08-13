import { getName } from './getName'

class MetaController {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getName() {
    return getName(this.requestId)
  }
}

export default MetaController
