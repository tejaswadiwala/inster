import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'
import { Metafields } from './models/Metafields'

export const getMetafieldByProductId = async (
  id: number,
  requestId: string
): Promise<Metafields> => {
  const type = 'ShopifyController.getMetafieldByProductId'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const endpoint = `/products/${id}/metafields.json`

    const response: AxiosResponse = await helpers.axiosHelper.getResponse(
      shopifyAxiosInstance,
      endpoint
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
