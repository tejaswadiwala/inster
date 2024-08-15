import logger, { serializeError } from '../../logger'
import { UpdateMetafield } from '../../shopify/dtos/UpdateMetafield'
import { getAllProducts } from '../../shopify/getAllProducts'
import { getMetafieldByProductId } from '../../shopify/getMetafieldByProductId'
import { updateMetafieldByProductId } from '../../shopify/updateMetafieldById'
import { Metafields } from '../../shopify/models/Metafields'
import { SeoBettermentRouteBody } from './models/SeoBettermentRouteBody'
import { ProductFeaturesChatGpt } from './models/ProductFeaturesChatGpt'

class SeoBettermentService {
  async start(requestId: string, body: SeoBettermentRouteBody) {
    const type = 'SeoBettermentService.start'
    try {
      logger.info({
        message: `${type}: Starting now.`,
        type: type,
        requestId: requestId,
      })

      const allProducts = await getAllProducts(requestId)
      for (const product of allProducts.products) {
        logger.info({
          message: `${type}: Seo Enhancement starting for product - ${product.id}.`,
          type: type,
          requestId: requestId,
        })

        const metafields = await getMetafieldByProductId(product.id, requestId)

        const productFeaturesChatGpt: ProductFeaturesChatGpt = {
          productName: getProductNameFromMetafield(metafields, product.id),
          color: extractColor(product.title),
          keywords: body.keywords,
        }

        await updateMetafieldWithChatGptResponse(
          metafields,
          productFeaturesChatGpt,
          requestId
        )
      }

      // const metafields = await getMetafieldByProductId(7806827167993, requestId)

      logger.info({
        message: `${type}: Successfully completed execution.`,
        type: type,
        requestId: requestId,
      })
      return body
    } catch (error) {
      logger.error({
        message: `${type}: Error occurred.`,
        type: type,
        requestId: requestId,
        error: serializeError(error),
      })
      throw error
    }
  }
}

function getProductNameFromMetafield(
  metafields: Metafields,
  productId: number
): string {
  for (const metafield of metafields.metafields) {
    if (metafield.key == 'productName') {
      return metafield.value
    }
  }
  throw new Error(`Name not present for this product - ${productId}`)
}

async function createProductFeaturesFromChatGpt(
  productFeaturesChatGpt: ProductFeaturesChatGpt
) {
  return 'Here ChatGPT will give us the new value'
}

async function updateMetafieldWithChatGptResponse(
  metafields: Metafields,
  productFeaturesChatGpt: ProductFeaturesChatGpt,
  requestId: string
) {
  for (const metafield of metafields.metafields) {
    if (metafield.key == 'product_features') {
      const value = await createProductFeaturesFromChatGpt(
        productFeaturesChatGpt
      )

      const data: UpdateMetafield = {
        metafield: {
          id: metafield.id,
          value: value,
        },
      }

      await updateMetafieldByProductId(metafield.id, data, requestId)
    }
  }
}

function extractColor(title: string): string | null {
  const colors = [
    'Black',
    'White',
    'Blue',
    'Forest Green',
    'Beige',
    'Red',
    'Maroon',
  ]

  const lowerTitle = title.toLowerCase()

  for (const color of colors) {
    const lowerColor = color.toLowerCase()
    if (lowerTitle.includes(lowerColor)) {
      return color
    }
  }

  return null
}

export default SeoBettermentService
