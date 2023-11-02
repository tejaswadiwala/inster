import logger from '../logger'
import axios, { AxiosResponse } from 'axios'
import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  SHOPIFY_API_VERSION,
  SHOPIFY_SHOP_NAME,
} from '../config'
import { GetAllProductsDTO } from './dtos/GetAllProductsDTO'

export const getAllProductsPaginated = async (
  requestId: string
): Promise<GetAllProductsDTO[]> => {
  const type = 'getAllProductsPaginated'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const endpoint = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/products.json?status=active&count=true`

    const allProducts: GetAllProductsDTO[] = []

    let nextPageUrl: string | undefined = endpoint
    while (nextPageUrl) {
      const response: AxiosResponse = await axios.get(nextPageUrl, {
        headers: { 'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN },
      })

      allProducts.push(...response.data.products)

      const linkHeader = response.headers.link
      if (linkHeader) {
        const nextPageMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
        if (nextPageMatch) {
          nextPageUrl = nextPageMatch[1]
        } else {
          nextPageUrl = undefined // No 'next' link found
        }
      } else {
        nextPageUrl = undefined // No 'Link' header found
      }
    }

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })

    return allProducts
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
