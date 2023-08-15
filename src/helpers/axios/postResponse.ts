import logger from '../../logger'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const postResponse = async (
  instance: AxiosInstance,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  endpoint: string,
  requestId: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const type = 'AxiosHelper.postResponse'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })
    let response: AxiosResponse

    if (config) {
      response = await instance.post(endpoint, data, config)
    } else {
      response = await instance.post(endpoint, data)
    }

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return response
  } catch (error) {
    logger.error({
      type: type,
      message: `${type}: Error occurred.`,
      error: error,
      requestId: requestId,
    })
    throw error
  }
}
