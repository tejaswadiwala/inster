import { GetAccountsDTO } from './dtos/GetAccountsDTO'
import { GetLongLivedTokenDTO } from './dtos/GetLongLivedTokenDTO'
import { getAccounts } from './getAccounts'
import { getLongLivedToken } from './getLongLivedToken'
import { getName } from './getName'
import Instagram from './instagram/Instagram'

class MetaController {
  private requestId: string
  public instagram: Instagram

  constructor(requestId: string) {
    this.requestId = requestId
    this.instagram = new Instagram(requestId)
  }

  public async getName() {
    return getName(this.requestId)
  }

  public async getAccounts(): Promise<GetAccountsDTO> {
    return getAccounts(this.requestId)
  }

  public async getLongLivedToken(): Promise<GetLongLivedTokenDTO> {
    return getLongLivedToken(this.requestId)
  }
}

export default MetaController
