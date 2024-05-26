import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { AxiosResponse } from 'axios'
import { shopifyAxiosInstance } from './shopifyAuth'
import { SHOPIFY_GET_ALL_PRODUCTS_PARAMS } from '../config'
import { GetAllProductsDTO } from './dtos/GetAllProductsDTO'

export const getAllProducts = async (
  requestId: string
): Promise<GetAllProductsDTO> => {
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

    let allProducts: any[] = []

    let response: AxiosResponse = await helpers.axiosHelper.getResponse(
      shopifyAxiosInstance,
      endpoint,
      config
    )

    while (response.data.products.length > 0) {
      allProducts = allProducts.concat(response.data.products)

      const nextPageLink = getNextPageLink(response.headers)
      if (!nextPageLink) {
        break
      }

      response = await helpers.axiosHelper.getResponse(
        shopifyAxiosInstance,
        nextPageLink
      )
    }

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return { products: allProducts }
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

const getNextPageLink = (headers: any): string | undefined => {
  const linkHeader = headers['link']
  if (linkHeader && typeof linkHeader === 'string') {
    const matches = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  }
  return undefined
}
