import Helpers from '../helpers/Helpers'
import logger from '../logger'

import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'
import { SHOPIFY_GET_ALL_PRODUCTS_PARAMS } from '../config'

export const getAllProducts = async (requestId: string) => {
  const type = 'ShopifyController.getAllProducts'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const endpoint = '/products.json'
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
