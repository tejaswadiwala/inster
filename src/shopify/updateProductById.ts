import logger from '../logger'
import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'

export const updateProductById = async (
  productId: number,
  data: any,
  requestId: string
): Promise<any> => {
  const type = 'ShopifyController.updateProductById'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })
    const endpoint = `products/${productId}.json`

    const response: AxiosResponse = await shopifyAxiosInstance.put(
      endpoint,
      data
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return response.data
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
