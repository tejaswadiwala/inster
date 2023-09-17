import logger, { serializeError } from '../../logger'
import OpenAIController from '../../openai/OpenAIController'
import { reviewGenerator } from '../../openai/chatgpt/personas/reviewGenerator'
import { getAllProducts } from '../../shopify/getAllProducts'

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
        const allProducts: GetAllProductsDTO = await getAllProducts(requestId)

        let exportCsvCounter = 0
        for (const product of allProducts.products) {
          if (exportCsvCounter > 10) {
            const openaiController = new OpenAIController(requestId)
            await openaiController.chatGPT.getResponse(
              reviewGenerator(
                product.title,
                product.body_html,
                generateReviewsRequest.csvFormat,
                requestId
              )
            )
            exportCsvCounter = 0
          }
          exportCsvCounter++
        }
      } else {
        // In the case when productIds is given
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
