import logger, { serializeError } from '../../logger'
import { getAllProducts } from '../../shopify/getAllProducts'
import { SeoBettermentRouteBody } from './models/SeoBettermentRouteBody'
import { Product } from '../../shopify/models/Product'
import { getProductId } from '../../shopify/getProductId'
import { processProducts } from './processProducts'

class SeoBettermentService {
  async start(requestId: string, body: SeoBettermentRouteBody) {
    const type = 'SeoBettermentService.start'
    try {
      logger.info({
        message: `${type}: Starting now.`,
        type: type,
        requestId: requestId,
      })

      if (!body.productIds) {
        const allProducts = await getAllProducts(requestId)
        await processProducts(allProducts.products, body, requestId)
      } else {
        const allProducts: Product[] = []
        for (const id of body.productIds) {
          const product = await getProductId(id, requestId)
          allProducts.push(product)
        }
        await processProducts(allProducts, body, requestId)
      }

      logger.info({
        message: `${type}: Successfully completed execution.`,
        type: type,
        requestId: requestId,
      })
      return 'ok'
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

export default SeoBettermentService
