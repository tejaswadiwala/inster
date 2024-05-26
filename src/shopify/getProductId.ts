import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'
import { SHOPIFY_GET_ALL_PRODUCTS_PARAMS } from '../config'
import { Product } from './models/Product'

export const getProductId = async (
  id: string,
  requestId: string
): Promise<Product> => {
  const type = 'ShopifyController.getProductId'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const endpoint = `/products/${id}.json`
    const config = {
      params: {
        status: SHOPIFY_GET_ALL_PRODUCTS_PARAMS.STATUS_ACTIVE,
        count: true,
      },
    }

    const response: AxiosResponse = await helpers.axiosHelper.getResponse(
      shopifyAxiosInstance,
      endpoint,
      config
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return response.data.product
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
