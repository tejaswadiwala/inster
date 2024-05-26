import logger, { serializeError } from '../../logger'
import { getAllProducts } from '../../shopify/getAllProducts'
import { GenerateReviewsRequestDTO } from './dtos/GenerateReviewsRequestDTO'
import { getProductId } from '../../shopify/getProductId'
import { exportProducts } from './exportProducts'
import { Product } from '../../shopify/models/Product'

class ReviewsService {
  public static async generate(
    generateReviewsRequest: GenerateReviewsRequestDTO,
    requestId: string
  ) {
    const type = 'ReviewsService.generate'
    try {
      logger.info({
        message: `${type}: Starting now.`,
        type: type,
        requestId: requestId,
      })
      if (!generateReviewsRequest.productIds) {
        // In the case when we want to generate reviews for all the products
        const allProducts = await getAllProducts(requestId)

        await exportProducts(
          generateReviewsRequest,
          allProducts.products,
          requestId
        )
      } else {
        // In the case when productIds is given
        const allProducts: Product[] = []
        for (const id of generateReviewsRequest.productIds) {
          const product = await getProductId(id, requestId)
          allProducts.push(product)
        }
        await exportProducts(generateReviewsRequest, allProducts, requestId)
      }
      logger.info({
        message: `${type}: Successfully completed execution.`,
        type: type,
        requestId: requestId,
      })
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

export default ReviewsService
