import logger, { serializeError } from '../../logger'
import OpenAIController from '../../openai/OpenAIController'
import { reviewGenerator } from '../../openai/chatgpt/personas/reviewGenerator'
import { getAllProducts } from '../../shopify/getAllProducts'
import * as Papa from 'papaparse'
import { writeFileSync } from 'fs'
import { getAbsolutePathFromRelativePath } from '../helpers/getAbsolutePathFromRelativePath'

class ReviewsService {
  public static async generate(
    generateReviewsRequest: GenerateReviewsRequestDTO,
    requestId: string
  ) {
    const type = 'ReviewsService.generate'
    const processedProducts = []
    try {
      logger.info({
        message: `${type}: Starting now.`,
        type: type,
        requestId: requestId,
      })
      if (!generateReviewsRequest.productIds) {
        // In the case when we want to generate reviews for all the products
        const allProducts = await getAllProducts(requestId)
        let generatedReviews = []
        let exportCsvCounter = 0
        let batchCounter = 1

        for (const product of allProducts.products) {
          const generatedReviewsForOneProduct = await generateReviews(
            product,
            generateReviewsRequest.csvFormat,
            requestId
          )

          generatedReviews.push(...generatedReviewsForOneProduct)
          processedProducts.push(product.id)

          if (exportCsvCounter > 10) {
            const now = new Date()
            const currentDateTimeString = now.toISOString()
            const filePath = `src/services/reviews/export/batch-${batchCounter}-${currentDateTimeString}.csv`
            const absoluteFilePath = getAbsolutePathFromRelativePath(filePath)
            const finalCsvExport = Papa.unparse(generatedReviews)
            writeFileSync(absoluteFilePath, finalCsvExport)
            batchCounter++

            exportCsvCounter = 0
            generatedReviews = []
          }
          exportCsvCounter++
        }
      } else {
        // In the case when productIds is given
        // TODO: Add the implementation
      }
      logger.info({
        message: `${type}: Successfully completed execution.`,
        type: type,
        requestId: requestId,
      })
    } catch (error) {
      logger.error({
        message: `${type}: Error occurred.`,
        processedProducts,
        type: type,
        requestId: requestId,
        error: serializeError(error),
      })
      throw error
    }
  }
}

const generateReviews = async (
  product: Product,
  csvFormat: string,
  requestId: string
) => {
  const openaiController = new OpenAIController(requestId)
  const generatedReviews = await openaiController.chatGPT.getResponse(
    reviewGenerator(product, csvFormat, requestId)
  )

  const unescapedJsonString = generatedReviews.replace(/\\"/g, '"')
  // Parse the unescaped JSON string into an object
  const parsedObject = JSON.parse(unescapedJsonString)
  return parsedObject
}

export default ReviewsService
