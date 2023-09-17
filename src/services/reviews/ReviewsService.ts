import logger, { serializeError } from '../../logger'
import OpenAIController from '../../openai/OpenAIController'
import { reviewGenerator } from '../../openai/chatgpt/personas/reviewGenerator'
import { getAllProducts } from '../../shopify/getAllProducts'
import * as Papa from 'papaparse'
import { flattenArray } from '../helpers/flattenArray'
import { writeFileSync } from 'fs'
import { getAbsolutePathFromRelativePath } from '../helpers/getAbsolutePathFromRelativePath'

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
        let generatedReviews = []
        let exportCsvCounter = 0
        let batchCounter = 1

        for (const product of allProducts.products) {
          const generatedReviewsForOneProduct = await generateReviews(
            product,
            generateReviewsRequest.csvFormat,
            requestId
          )

          generatedReviews.push(
            Papa.parse(generatedReviewsForOneProduct, {
              header: true, // Treat the first row as headers
              skipEmptyLines: true, // Skip empty lines
            }).data
          )

          if (exportCsvCounter > 10) {
            const flattenedGeneratedReviews = flattenArray(generatedReviews)

            const now = new Date()
            const currentDateTimeString = now.toISOString()
            const filePath = `src/services/reviews/export/batch-${batchCounter}-${currentDateTimeString}.csv`
            const absoluteFilePath = getAbsolutePathFromRelativePath(filePath)
            const finalCsvExport = Papa.unparse(flattenedGeneratedReviews)
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
  return generatedReviews
}

export default ReviewsService
