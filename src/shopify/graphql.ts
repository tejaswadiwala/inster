import axios from 'axios'
import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_API_VERSION,
  SHOPIFY_SHOP_NAME,
} from '../config'
import logger from '../logger'

export async function shopifyGraphQL(
  body: string,
  requestId: string
): Promise<any> {
  const type = 'shopifyGraphQL'
  try {
    logger.info({
      message: `${type}: Starting now.`,
      body: JSON.parse(body),
      requestId,
    })

    const endpoint = `https://${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/graphql.json`

    const response = await axios.post(endpoint, body, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN as string,
        'Content-Type': 'application/json',
      },
    })

    logger.info({
      message: `${type}: Successfully completed execution.`,
      response: JSON.stringify(response.data),
      requestId,
    })

    return response.data
  } catch (error) {
    logger.error({
      message: `${type}: Error occurred.`,
      error: error instanceof Error ? error.message : error,
      requestId,
    })
    throw error
  }
}
