import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getResponse } from './getResponse'
import { postResponse } from './postResponse'

class AxiosHelper {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getResponse(
    instance: AxiosInstance,
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return getResponse(instance, endpoint, this.requestId, config)
  }

  public async postResponse(
    instance: AxiosInstance,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return postResponse(instance, data, endpoint, this.requestId, config)
  }
}

export default AxiosHelper
