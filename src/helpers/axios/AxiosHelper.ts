import { AxiosInstance, AxiosResponse } from 'axios'
import { getResponse } from './getResponse'

class AxiosHelper {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getResponse(
    instance: AxiosInstance,
    endpoint: string
  ): Promise<AxiosResponse> {
    return getResponse(instance, endpoint, this.requestId)
  }
}

export default AxiosHelper
