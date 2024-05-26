import { REVIEWS_SERVICE_PROCESSING_BATCH_SIZE } from '../../config'
import logger, { serializeError } from '../../logger'
import OpenAIController from '../../openai/OpenAIController'
import { reviewGenerator } from '../../openai/chatgpt/personas/reviewGenerator'
import { Product } from '../../shopify/models/Product'
import { getAbsolutePathFromRelativePath } from '../helpers/getAbsolutePathFromRelativePath'
import { GenerateReviewsRequestDTO } from './dtos/GenerateReviewsRequestDTO'
import * as Papa from 'papaparse'
import { writeFileSync } from 'fs'

export async function exportProducts(
  generateReviewsRequest: GenerateReviewsRequestDTO,
  allProducts: Product[],
  requestId: string
) {
  const type = 'ReviewsService.exportProducts'
  const productsNotProcessed: number[] = []
  let batchCounter = 1
  let generatedReviews = []
  const processedProducts: number[] = []
  let exportCsvCounter = 1
  try {
    for (const product of allProducts) {
      if (processedProducts.includes(product.id)) {
        continue
      }
      exportCsvCounter++

      try {
        const generatedReviewsForOneProduct = await generateReviews(
          product,
          generateReviewsRequest.csvFormat,
          requestId
        )

        generatedReviews.push(...generatedReviewsForOneProduct)

        if (exportCsvCounter > REVIEWS_SERVICE_PROCESSING_BATCH_SIZE) {
          exportToCsv(generatedReviews, batchCounter)
          processedProducts.push(product.id)
          exportCsvCounter = 0
          generatedReviews = []
          batchCounter++
        }
      } catch (error) {
        productsNotProcessed.push(product.id)
        exportToCsv(generatedReviews, batchCounter)
        productsNotProcessed.push(product.id)
        batchCounter++
        logger.error({
          message: `${type}: Error while processing.`,
          productsNotProcessed,
          type,
          requestId,
        })
        continue
      }
    }
  } catch (error) {
    exportToCsv(generatedReviews, batchCounter)
    logger.error({
      message: `${type}: Error occurred.`,
      productsNotProcessed,
      type: type,
      requestId: requestId,
      error: serializeError(error),
    })
    throw error
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportToCsv = (generatedReviews: any, batchCounter: number) => {
  const now = new Date()
  const currentDateTimeString = now.toISOString()
  const filePath = `src/services/reviews/export/batch-${batchCounter}-${currentDateTimeString}.csv`
  const absoluteFilePath = getAbsolutePathFromRelativePath(filePath)
  const finalCsvExport = Papa.unparse(generatedReviews)
  writeFileSync(absoluteFilePath, finalCsvExport)
}
