import logger from '../../logger'
import { AxiosInstance, AxiosResponse } from 'axios'

export const getResponse = async (
  instance: AxiosInstance,
  endpoint: string,
  requestId: string
): Promise<AxiosResponse> => {
  const type = 'AxiosHelper.getResponse'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const response: AxiosResponse = await instance.get(endpoint)

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
