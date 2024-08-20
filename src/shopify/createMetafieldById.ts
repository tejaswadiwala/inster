import logger from '../logger'
import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'
import { UpdateMetafield } from './dtos/UpdateMetafield'
import { Metafield } from './models/Metafield'

export const createMetafieldById = async (
  productId: number,
  data: UpdateMetafield,
  requestId: string
): Promise<Metafield> => {
  const type = 'ShopifyController.updateMetafieldByProductId'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })
    const endpoint = `/products/${productId}/metafields.json`

    const response: AxiosResponse = await shopifyAxiosInstance.post(
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
